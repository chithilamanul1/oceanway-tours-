import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  travelDates: String,
  travellers: String,
  interest: String,
  message: { type: String, required: true },
  budget: String,
  read: { type: Boolean, default: false },
  funnelStep: { type: Number, default: 1 },
}, { timestamps: true });

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

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

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'bookings@updates.oceanwaytours.com',
        to: 'inquires@oceanwaytours.com',
        subject: `New Inquiry from ${body.name}`,
        html: `
          <h2>New Booking Inquiry</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
          <p><strong>Travel Dates:</strong> ${body.travelDates || 'N/A'}</p>
          <p><strong>Travellers:</strong> ${body.travellers || 'N/A'}</p>
          <p><strong>Interest/Destination:</strong> ${body.interest || 'N/A'}</p>
          <p><strong>Budget:</strong> ${body.budget || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${body.message}</p>
        `
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // We don't fail the request if email fails, because DB saved successfully
    }

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
