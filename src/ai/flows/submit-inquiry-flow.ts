'use server';

import { enquirySchema, type EnquiryFormInput } from '@/lib/enquiry-schema';
import { saveHubSpotEnquiry } from '@/lib/hubspot';

export type EnquiryFormOutput = { success: boolean; message: string };

export async function submitEnquiry(input: EnquiryFormInput): Promise<EnquiryFormOutput> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: 'Please check your details and try again.' };
  }
  try {
    await saveHubSpotEnquiry(parsed.data);
    return { success: true, message: 'Enquiry submitted successfully! We will get back to you shortly.' };
  } catch {
    // Never expose upstream errors, contact details, or credentials to the browser/logs.
    return { success: false, message: 'Unable to submit your enquiry right now. Please try again shortly.' };
  }
}
