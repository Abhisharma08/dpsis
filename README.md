# DPSIS Bridge Program landing page

Next.js landing page for the 2027 Bridge Program. Existing school copy, testimonials, images, downloads and links are preserved.

## Run locally

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and set `HUBSPOT_ACCESS_TOKEN` to your HubSpot private app access token.
3. Run `npm run dev` and open http://localhost:9002.

## HubSpot setup

Grant the private app `crm.objects.contacts.read` and `crm.objects.contacts.write` scopes. Set `HUBSPOT_ACCESS_TOKEN` as a server runtime secret in your deployment environment too, then restart/redeploy. Do not prefix it with `NEXT_PUBLIC_` or commit the token.

Enquiries create a contact with lifecycle stage `lead`, matching parents by email. Existing CRM properties and lifecycle stages are preserved. Each enquiry adds an associated timeline note containing all five submitted fields and the program name; this preserves enquiries for different children using the same parent email. No custom HubSpot properties are required. These are CRM contacts, not Sales Hub Lead objects, and are not automatically subscribed to marketing.

Success is shown only after both the contact and enquiry note are saved. Missing tokens, invalid input, API errors and timeouts leave the form available for retry. If note creation fails after contact creation, the contact remains and a retry reuses it. An ambiguous network timeout after note creation can produce a duplicate note on retry; there is no durable submission queue or exactly-once guarantee.

The old, incomplete Google Sheets submission flow is replaced by HubSpot. Google Sheets credentials are no longer needed for enquiries.

API references: [Contacts](https://developers.hubspot.com/docs/api-reference/legacy/crm/objects/contacts/guide), [HubSpot note creation and contact association](https://developers.hubspot.com/blog/how-to-write-cron-jobs-in-hubspot-to-take-time-based-action-on-crm-data).

## Verify

Use Node.js 22.6+ for the test runner. Run `npm run typecheck`, `npm test`, and `npm run build`. Integration tests mock HubSpot; they never create live contacts. After configuring your real token, submit an enquiry with a test address and confirm the contact and its enquiry note in HubSpot.
