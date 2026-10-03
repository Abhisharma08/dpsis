import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { saveHubSpotEnquiry } from '../src/lib/hubspot.ts';
import { enquirySchema } from '../src/lib/enquiry-schema.ts';

const originalFetch = globalThis.fetch;
const originalToken = process.env.HUBSPOT_ACCESS_TOKEN;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalToken === undefined) delete process.env.HUBSPOT_ACCESS_TOKEN;
  else process.env.HUBSPOT_ACCESS_TOKEN = originalToken;
});
const input = { parentName: 'Jane Doe', childName: 'Sam <Doe>', grade: 'K2', email: 'jane@example.com', phone: '+65 8123 4567' };
function mockHubSpot(responses) {
  process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, ...init, body: init.body ? JSON.parse(init.body) : undefined });
    assert.ok(responses.length, 'Unexpected API request');
    const next = responses.shift();
    if (next instanceof Error) throw next;
    return new Response(JSON.stringify(next.body ?? {}), { status: next.status });
  };
  return calls;
}

test('validates and normalizes both local and international enquiries', () => {
  assert.equal(enquirySchema.parse({ ...input, email: ' JANE@example.com ', phone: '81234567' }).email, input.email);
  for (const change of [{ parentName: '  ' }, { childName: '' }, { grade: '' }, { email: 'bad' }, { phone: '--------' }, { phone: '12345' }]) {
    assert.equal(enquirySchema.safeParse({ ...input, ...change }).success, false);
  }
});

test('creates a new lead and associates a safely escaped note with every enquiry field', async () => {
  const calls = mockHubSpot([{ status: 404 }, { status: 201, body: { id: '123' } }, { status: 201, body: { id: '456' } }]);
  await saveHubSpotEnquiry(input);
  assert.equal(calls.length, 3);
  assert.match(calls[0].url, /jane%40example.com\?idProperty=email$/);
  assert.deepEqual(calls[1].body.properties, { email: input.email, firstname: 'Jane', lastname: 'Doe', phone: input.phone, lifecyclestage: 'lead', child_name: input.childName, grade: input.grade });
  assert.equal(calls[2].body.associations[0].to.id, '123');
  const note = calls[2].body.properties.hs_note_body;
  for (const value of ['Jane Doe', 'Sam &lt;Doe&gt;', 'K2', input.email, input.phone, '2027']) assert.ok(note.includes(value));
  for (const call of calls) {
    assert.equal(call.headers.Authorization, 'Bearer test-token');
    assert.equal(call.cache, 'no-store');
    assert.ok(call.signal instanceof AbortSignal);
  }
});

test('updates child properties on existing contacts while preserving other CRM fields', async () => {
  const calls = mockHubSpot([{ status: 200, body: { id: 'existing' } }, { status: 200, body: { id: 'existing' } }, { status: 201, body: { id: 'note' } }]);
  await saveHubSpotEnquiry(input);
  assert.deepEqual(calls.map(call => call.method), ['GET', 'PATCH', 'POST']);
  assert.match(calls[1].url, /\/contacts\/existing$/);
  assert.deepEqual(calls[1].body.properties, { child_name: input.childName, grade: input.grade });
  assert.match(calls[2].url, /\/notes$/);
  assert.equal(calls[2].body.associations[0].to.id, 'existing');
});

test('recovers from a concurrent duplicate-contact conflict', async () => {
  const calls = mockHubSpot([{ status: 404 }, { status: 409 }, { status: 200, body: { id: 'existing' } }, { status: 200, body: { id: 'existing' } }, { status: 201, body: { id: 'note' } }]);
  await saveHubSpotEnquiry(input);
  assert.deepEqual(calls[3].body.properties, { child_name: input.childName, grade: input.grade });
  assert.equal(calls[4].body.associations[0].to.id, 'existing');
});

test('fails before making a request when no token is configured', async () => {
  const calls = mockHubSpot([]);
  delete process.env.HUBSPOT_ACCESS_TOKEN;
  await assert.rejects(saveHubSpotEnquiry(input), /not configured/);
  assert.equal(calls.length, 0);
});

for (const status of [401, 403, 429, 500]) {
  test(`does not create records after a ${status} lookup failure`, async () => {
    const calls = mockHubSpot([{ status }]);
    await assert.rejects(saveHubSpotEnquiry(input));
    assert.equal(calls.length, 1);
  });
}

test('does not report success if the enquiry note fails', async () => {
  mockHubSpot([{ status: 200, body: { id: '123' } }, { status: 200, body: { id: '123' } }, { status: 500 }]);
  await assert.rejects(saveHubSpotEnquiry(input));
});

test('does not save a note or report success if child properties cannot be updated', async () => {
  const calls = mockHubSpot([{ status: 200, body: { id: '123' } }, { status: 400 }]);
  await assert.rejects(saveHubSpotEnquiry(input));
  assert.equal(calls.length, 2);
});

test('propagates network failures and malformed record responses', async () => {
  mockHubSpot([new Error('Network timeout')]);
  await assert.rejects(saveHubSpotEnquiry(input));
  mockHubSpot([{ status: 200, body: {} }]);
  await assert.rejects(saveHubSpotEnquiry(input), /Invalid HubSpot response/);
});
