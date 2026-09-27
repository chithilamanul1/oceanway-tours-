import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String, travelDates: String, travellers: String,
  interest: String, message: { type: String, required: true },
  budget: String, read: { type: Boolean, default: false },
  funnelStep: { type: Number, default: 1 },
}, { timestamps: true });

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const message = await ContactMessage.findById(params.id).lean();
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await ContactMessage.findByIdAndUpdate(params.id, body, { new: true }).lean();
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await ContactMessage.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
