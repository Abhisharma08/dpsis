import type { EnquiryFormInput } from './enquiry-schema';

const baseUrl = 'https://api.hubapi.com/crm/v3/objects';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

// Only imported by the server action. The access token must never use NEXT_PUBLIC_.
export async function saveHubSpotEnquiry(input: EnquiryFormInput): Promise<void> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  if (!token) throw new Error('HubSpot is not configured.');

  async function request(path: string, method: string, body?: unknown) {
    return fetch(`${baseUrl}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
  }

  async function recordId(response: Response): Promise<string> {
    if (!response.ok) throw new Error(`HubSpot request failed (${response.status}).`);
    const record = await response.json();
    if (typeof record.id !== 'string' || !record.id) throw new Error('Invalid HubSpot response.');
    return record.id;
  }

  const emailPath = `/contacts/${encodeURIComponent(input.email)}?idProperty=email`;
  const childProperties = { child_name: input.childName, grade: input.grade };
  async function updateChildProperties(response: Response): Promise<string> {
    const id = await recordId(response);
    return recordId(await request(`/contacts/${encodeURIComponent(id)}`, 'PATCH', {
      properties: childProperties,
    }));
  }
  const existing = await request(emailPath, 'GET');
  let contactId: string;
  if (existing.ok) {
    // Update the latest child details while preserving other existing CRM fields.
    contactId = await updateChildProperties(existing);
  } else if (existing.status === 404) {
    const [firstname, ...lastNames] = input.parentName.split(/\s+/);
    const created = await request('/contacts', 'POST', {
      properties: {
        email: input.email, firstname, lastname: lastNames.join(' '),
        phone: input.phone, lifecyclestage: 'lead',
        ...childProperties,
      },
    });
    // Handle another submission creating this parent during the lookup.
    contactId = created.status === 409
      ? await updateChildProperties(await request(emailPath, 'GET'))
      : await recordId(created);
  } else {
    throw new Error(`HubSpot lookup failed (${existing.status}).`);
  }

  const fields = [
    ["Parent's Name", input.parentName], ["Child's Name", input.childName],
    ["Child's Current/Last Grade", input.grade], ['Email Address', input.email],
    ['Phone Number', input.phone],
  ];
  const note = await request('/notes', 'POST', {
    properties: {
      hs_timestamp: new Date().toISOString(),
      hs_note_body: '<h2>DPSIS Bridge Program 2027 enquiry</h2>' + fields
        .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join(''),
    },
    associations: [{
      to: { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
    }],
  });
  // Success requires the child's enquiry details to be saved too.
  await recordId(note);
}
