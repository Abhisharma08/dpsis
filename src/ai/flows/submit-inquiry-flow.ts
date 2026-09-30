'use server';
/**
 * @fileOverview Handles submission of the enquiry form to HubSpot CRM.
 *
 * - submitEnquiry - A function to process enquiry form data and save to HubSpot.
 * - EnquiryFormInput - The input type for the enquiry form.
 * - EnquiryFormOutput - The return type for the enquiry submission.
 */

import { z } from 'zod';

const EnquiryFormInputSchema = z.object({
  parentName: z.string().min(2).max(100),
  childName: z.string().min(2).max(100),
  grade: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s()-]{10,20}$/),
});
export type EnquiryFormInput = z.infer<typeof EnquiryFormInputSchema>;

const EnquiryFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type EnquiryFormOutput = z.infer<typeof EnquiryFormOutputSchema>;

export async function submitEnquiry(input: EnquiryFormInput): Promise<EnquiryFormOutput> {
  const parseResult = EnquiryFormInputSchema.safeParse(input);
  if (!parseResult.success) {
    const errorMsg = parseResult.error.errors.map(e => e.message).join(', ');
    return {
      success: false,
      message: `Invalid form data: ${errorMsg}`,
    };
  }

  const validatedInput = parseResult.data;

  console.log('Received enquiry, attempting to save to HubSpot:', {
    ...validatedInput,
    email: validatedInput.email ? validatedInput.email.replace(/(?<=.).(?=.*@)/g, '*') : '',
  });

  const accessToken =
    process.env.HUBSPOT_ACCESS_TOKEN ||
    process.env.HUBSPOT_TOKEN ||
    process.env.HUBSPOT_API_KEY ||
    process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('HubSpot access token is not configured in environment variables.');
    return {
      success: false,
      message: 'Server configuration error. HubSpot credentials are not configured.',
    };
  }

  try {
    const nameParts = validatedInput.parentName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const contactProperties: Record<string, string> = {
      email: validatedInput.email.trim(),
      firstname: firstName,
      lastname: lastName,
      phone: validatedInput.phone.trim(),
    };

    let contactId: string | null = null;

    // 1. Attempt to create the contact in HubSpot
    const createResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: contactProperties }),
    });

    if (createResponse.ok) {
      const createData = await createResponse.json();
      contactId = createData.id;
      console.log(`Successfully created new contact in HubSpot with ID: ${contactId}`);
    } else if (createResponse.status === 409) {
      // Contact already exists, update the contact by email
      console.log(`Contact already exists in HubSpot (${validatedInput.email}). Updating contact record...`);
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(validatedInput.email.trim())}?idProperty=email`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties: contactProperties }),
        }
      );

      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        contactId = updateData.id;
        console.log(`Successfully updated contact in HubSpot with ID: ${contactId}`);
      } else {
        // If updating by email fails, try to extract existing ID from 409 response
        const conflictData = await createResponse.json().catch(() => null);
        const match = conflictData?.message?.match(/Existing ID:\s*(\d+)/i);
        if (match && match[1]) {
          contactId = match[1];
          console.log(`Retrieved existing contact ID from conflict response: ${contactId}`);
        } else {
          const updateErr = await updateResponse.json().catch(() => null);
          console.error('Failed to update existing contact in HubSpot:', updateErr || updateResponse.statusText);
          return {
            success: false,
            message: 'Failed to update contact in HubSpot. Please try again later.',
          };
        }
      }
    } else {
      const errorData = await createResponse.json().catch(() => null);
      console.error('Error creating contact in HubSpot:', errorData || createResponse.statusText);
      const errorMsg = errorData?.message || `HubSpot API returned status ${createResponse.status}`;
      return {
        success: false,
        message: `HubSpot submission failed: ${errorMsg}`,
      };
    }

    // 2. Attach an engagement Note to the contact with full form details (childName, grade, parentName, etc.)
    if (contactId) {
      try {
        const noteContent = [
          'Website Enquiry Form Submission',
          '--------------------------------',
          `Parent Name: ${validatedInput.parentName}`,
          `Child Name: ${validatedInput.childName}`,
          `Child's Current/Last Grade: ${validatedInput.grade}`,
          `Email: ${validatedInput.email}`,
          `Phone: ${validatedInput.phone}`,
          `Submitted At: ${new Date().toISOString()}`,
        ].join('\n');

        const noteResponse = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              hs_note_body: noteContent,
              hs_timestamp: new Date().toISOString(),
            },
            associations: [
              {
                to: {
                  id: String(contactId),
                },
                types: [
                  {
                    associationCategory: 'HUBSPOT_DEFINED',
                    associationTypeId: 202, // Note to Contact association
                  },
                ],
              },
            ],
          }),
        });

        if (noteResponse.ok) {
          console.log(`Successfully associated enquiry note with HubSpot contact ID: ${contactId}`);
        } else {
          const noteErr = await noteResponse.json().catch(() => null);
          console.warn('Note creation warning (contact was still created/updated):', noteErr);
        }
      } catch (noteError) {
        console.warn('Failed to attach note to contact, but contact was saved:', noteError);
      }
    }

    return {
      success: true,
      message: 'Enquiry submitted successfully! We will get back to you shortly.',
    };
  } catch (error) {
    console.error('Unexpected error submitting to HubSpot:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      message: `Failed to submit enquiry: ${errorMessage}`,
    };
  }
}
