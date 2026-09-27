# Goal Description

Expand the admin dashboard to be fully functional. It will include a full CRUD interface for Itineraries (including updating images), a viewer for Bookings/Inquiries, and an email forwarding integration so that all new inquiries submitted are emailed directly to `inquires@oceanwaytours.com`.

## User Review Required

- **Email Forwarding**: The contact form will be updated to automatically send an email to `inquires@oceanwaytours.com`. This requires standard SMTP credentials (like a Gmail App Password, AWS SES, or SendGrid). I will build the system using `nodemailer`, but you will need to add your email credentials (e.g., `SMTP_USER` and `SMTP_PASS`) to your Vercel Environment Variables later for the emails to actually send. Is this acceptable?
- **Image Uploads**: Right now, images are stored in your `public` folder and referenced by their path (e.g. `/image.jpg`). For the admin panel to upload *new* images dynamically to Vercel in production, we typically need a cloud storage solution like Vercel Blob or AWS S3, because Vercel's filesystem is read-only after deployment. For this implementation, I will build the Admin UI so you can input the image path/URL for the itineraries, but if you want drag-and-drop uploads, we will need to integrate a storage provider. Let me know if you prefer to just input the URL, or if we should set up a storage provider.

## Open Questions
- None.

## Proposed Changes

### Admin Dashboard UI
- **[MODIFY]** `src/app/admin/AdminClient.tsx`: Convert the static placeholder into a real dashboard layout with a sidebar (Dashboard, Itineraries, Enquiries). Add state management to toggle between views.
- **[NEW]** `src/components/admin/ItinerariesManager.tsx`: A robust data table and form to list, create, edit, and delete itineraries. It will connect to `GET/POST/PUT/DELETE /api/itineraries`.
- **[NEW]** `src/components/admin/EnquiriesViewer.tsx`: A table and detail view to read all client bookings and contact messages. It will connect to `GET /api/inquiries`.

### API Routes
- **[MODIFY]** `src/app/api/inquiries/route.ts`: Install and integrate `nodemailer`. When `POST` is called, in addition to saving to MongoDB, it will format a clean HTML email containing the booking details and send it to `inquires@oceanwaytours.com`.

## Verification Plan

### Automated Tests
- Run Next.js build (`npm run build`) to ensure there are no TypeScript or compilation errors.

### Manual Verification
- Log in to the admin panel with the demo password.
- Verify that real itineraries fetch from MongoDB.
- Edit an itinerary's image path and verify the change saves.
- Verify the Enquiries tab fetches data from MongoDB and displays all submitted forms.
- Submit a test inquiry on the frontend to verify the database insertion and the nodemailer trigger (it will gracefully log an error if SMTP env vars are missing, but won't crash the site).
