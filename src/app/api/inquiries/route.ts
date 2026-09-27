import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

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
    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
