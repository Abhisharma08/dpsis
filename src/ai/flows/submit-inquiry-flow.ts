'use server';
/**
 * @fileOverview Handles submission of the inquiry form.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const InquiryFormInputSchema = z.object({
  parentName: z.string().min(2).max(100),
  childName: z.string().min(2).max(100),
  grade: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
});
export type InquiryFormInput = z.infer<typeof InquiryFormInputSchema>;

const InquiryFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type InquiryFormOutput = z.infer<typeof InquiryFormOutputSchema>;

export async function submitInquiry(input: InquiryFormInput): Promise<InquiryFormOutput> {
  return submitInquiryFlow(input);
}

const submitInquiryFlow = ai.defineFlow(
  {
    name: 'submitInquiryFlow',
    inputSchema: InquiryFormInputSchema,
    outputSchema: InquiryFormOutputSchema,
  },
  async (input) => {
    console.log('Received inquiry, attempting to save to Google Sheets:', input);

    if (!process.env.GOOGLE_CREDENTIALS_PATH || !process.env.GOOGLE_SHEET_ID) {
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

      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const range = 'Sheet1!A1';

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toISOString(),
            input.parentName,
            input.childName,
            input.grade,
            input.email,
            input.phone,
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
        message: 'Failed to submit enquiry. Please try again.',
      };
    }
  }
);
