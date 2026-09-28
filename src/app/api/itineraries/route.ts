import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  id: String,
  title: String, destinationId: String, destinationName: String,
  duration: Number, groupSize: String, difficulty: String, price: Number,
  season: String, image: String, summary: String,
  highlights: [String], tier: String, theme: String,
  inclusions: [String], exclusions: [String],
  seoTitle: String, seoDescription: String,
  dayPlans: [{
    day: Number, title: String, description: String,
    activities: [String], accommodation: String,
    meals: { breakfast: Boolean, lunch: Boolean, dinner: Boolean },
    transferTime: String
  }]
}, { timestamps: true });

const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

export async function GET() {
  try {
    await connectDB();
    const itineraries = await Itinerary.find().lean();
    return NextResponse.json(itineraries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch itineraries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const itinerary = await Itinerary.create(body);
    return NextResponse.json(itinerary, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create itinerary' }, { status: 500 });
  }
}
