import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await ContactMessage.create({
      ...body,
      read: false,
      funnelStep: 1,
    });

    // Send beautiful branded email via Resend
    try {
      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Colombo',
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const whatsappNumber = body.phone ? body.phone.replace(/[^0-9]/g, '') : null;

      await resend.emails.send({
        from: 'bookings@updates.oceanwaytours.com',
        to: 'inquires@oceanwaytours.com',
        replyTo: body.email,
        subject: `✈️ New Booking Inquiry from ${body.name} — OceanWay Tours`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#0a2340 0%,#0a4da1 100%);padding:32px 40px;text-align:center;">
  <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">OceanWay Tours (Pvt) Ltd</p>
  <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">New Booking Inquiry</h1>
  <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">${submittedAt} · Sri Lanka Time</p>
</td></tr>

<!-- Alert banner -->
<tr><td style="background:#e8f4fd;border-left:4px solid #0a4da1;padding:14px 40px;">
  <p style="margin:0;color:#0a4da1;font-size:14px;font-weight:600;">🔔 New inquiry submitted — please respond within 24 hours.</p>
</td></tr>

<!-- Body -->
<tr><td style="padding:32px 40px;">

  <h2 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#0a2340;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8edf3;padding-bottom:8px;">Client Details</h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;width:140px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Full Name</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:14px;color:#0a2340;font-weight:700;">${body.name}</td>
    </tr>
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:14px;"><a href="mailto:${body.email}" style="color:#0a4da1;text-decoration:none;">${body.email}</a></td>
    </tr>
    <tr>
      <td style="padding:9px 0;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
      <td style="padding:9px 0;font-size:14px;color:#0a2340;">${body.phone ? `<a href="tel:${body.phone}" style="color:#0a2340;text-decoration:none;">${body.phone}</a>` : '<span style="color:#9ca3af;">Not provided</span>'}</td>
    </tr>
  </table>

  <h2 style="margin:0 0 16px;font-size:13px;font-weight:700;color:#0a2340;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8edf3;padding-bottom:8px;">Trip Requirements</h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;width:140px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Destination</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:14px;color:#0a2340;font-weight:600;">${body.interest || '<span style="color:#9ca3af">Not specified</span>'}</td>
    </tr>
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Travel Dates</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:14px;color:#0a2340;">${body.travelDates || '<span style="color:#9ca3af">Not specified</span>'}</td>
    </tr>
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Travellers</td>
      <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;font-size:14px;color:#0a2340;">${body.travellers || '<span style="color:#9ca3af">Not specified</span>'}</td>
    </tr>
    <tr>
      <td style="padding:9px 0;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Budget</td>
      <td style="padding:9px 0;font-size:14px;color:#0a2340;font-weight:700;">${body.budget || '<span style="color:#9ca3af">Not specified</span>'}</td>
    </tr>
  </table>

  <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0a2340;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8edf3;padding-bottom:8px;">Message from Client</h2>
  <div style="background:#f8f9fb;border-radius:8px;padding:18px 20px;margin-bottom:28px;border-left:3px solid #0a4da1;">
    <p style="margin:0;font-size:14px;color:#374151;line-height:1.8;white-space:pre-wrap;">${body.message}</p>
  </div>

  <!-- Action Buttons -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding-bottom:10px;">
        <a href="mailto:${body.email}?subject=Re:%20Your%20OceanWay%20Tours%20Inquiry&body=Dear%20${encodeURIComponent(body.name)}%2C%0A%0AThank%20you%20for%20reaching%20out%20to%20OceanWay%20Tours!%0A%0A"
           style="display:inline-block;background:#0a4da1;color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
          ✉️ &nbsp;Reply to ${body.name}
        </a>
      </td>
    </tr>
    ${whatsappNumber ? `<tr><td align="center" style="padding-bottom:10px;">
      <a href="https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(body.name)}%2C%20I'm%20from%20OceanWay%20Tours%20regarding%20your%20travel%20inquiry."
         style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:13px 32px;border-radius:50px;font-size:13px;font-weight:700;">
        💬 &nbsp;WhatsApp ${body.name}
      </a>
    </td></tr>` : ''}
    <tr><td align="center">
      <a href="https://oceanway-tours.vercel.app/admin"
         style="display:inline-block;background:#f8f9fb;color:#0a4da1;text-decoration:none;padding:11px 28px;border-radius:50px;font-size:12px;font-weight:600;border:1px solid #e8edf3;">
        📊 &nbsp;View in Admin CMS
      </a>
    </td></tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="background:#f8f9fb;padding:20px 40px;text-align:center;border-top:1px solid #e8edf3;">
  <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Auto-generated by the OceanWay Tours booking system.</p>
  <p style="margin:0;font-size:12px;color:#9ca3af;">OceanWay Tours (Pvt) Ltd · Negombo, Sri Lanka · hello@oceanwaytours.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the booking if email fails — DB already saved
    }

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
