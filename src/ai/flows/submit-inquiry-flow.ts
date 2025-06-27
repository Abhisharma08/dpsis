'use server';
/**
 * @fileOverview Handles submission of the enquiry form.
 *
 * - submitEnquiry - A function to process enquiry form data.
 * - EnquiryFormInput - The input type for the enquiry form.
 * - EnquiryFormOutput - The return type for the enquiry submission.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {google} from 'googleapis';

const EnquiryFormInputSchema = z.object({
  parentName: z.string().min(2).max(100),
  childName: z.string().min(2).max(100),
  grade: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s-()]{10,20}$/),
});
export type EnquiryFormInput = z.infer<typeof EnquiryFormInputSchema>;

const EnquiryFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type EnquiryFormOutput = z.infer<typeof EnquiryFormOutputSchema>;

export async function submitEnquiry(input: EnquiryFormInput): Promise<EnquiryFormOutput> {
  return submitEnquiryFlow(input);
}

const submitEnquiryFlow = ai.defineFlow(
  {
    name: 'submitEnquiryFlow',
    inputSchema: EnquiryFormInputSchema,
    outputSchema: EnquiryFormOutputSchema,
  },
  async (input) => {
    console.log('Received enquiry, attempting to save to Google Sheets:', input);

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      console.error('Google Sheets environment variables not set.');
      return {
        success: false,
        message: 'Server configuration error. Could not connect to data storage.',
      };
    }

     try {
      const credentialsPath = path.resolve(process.env.GOOGLE_CREDENTIALS_PATH);
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });


      const sheets = google.sheets({version: 'v4', auth});
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const range = 'Sheet1!A1'; // This will append to the first empty row of 'Sheet1'

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toISOString(), // Timestamp
            input.parentName,
            input.childName,
            input.grade,
            input.email,
            input.phone
          ]],
        },
      });

      return {
        success: true,
        message: 'Enquiry submitted successfully! We will get back to you shortly.',
      };
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return {
        success: false,
        message: `Failed to submit enquiry. Please try again.`,
      };
    }
  }
);
