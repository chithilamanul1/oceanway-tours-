import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: String,
  name: String, region: String, tag: String, tagline: String,
  description: String, image: String, bestSeason: String,
  gallery: [String], featured: Boolean,
  seoTitle: String, seoDescription: String,
}, { timestamps: true });

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export async function GET() {
  try {
    await connectDB();
    const destinations = await Destination.find().lean();
    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const destination = await Destination.create(body);
    return NextResponse.json(destination, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
