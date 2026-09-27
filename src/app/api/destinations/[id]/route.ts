import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: String, region: String, tag: String, tagline: String,
  description: String, image: String, bestSeason: String,
}, { timestamps: true });

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const destination = await Destination.findById(params.id).lean();
    if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(destination);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const destination = await Destination.findByIdAndUpdate(params.id, body, { new: true }).lean();
    if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(destination);
  } catch {
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Destination.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
