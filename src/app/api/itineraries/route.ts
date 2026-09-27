import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const dayPlanSchema = new mongoose.Schema({
  day: Number, title: String, description: String,
  activities: [String], accommodation: String,
  meals: { breakfast: Boolean, lunch: Boolean, dinner: Boolean },
  transferTime: String,
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  title: String, destinationId: String, destinationName: String,
  duration: Number, groupSize: String, difficulty: String,
  price: Number, season: String, image: String, summary: String,
  highlights: [String], tier: String, theme: String,
  dayPlans: [dayPlanSchema],
}, { timestamps: true });

const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');
    const theme = searchParams.get('theme');
    const destination = searchParams.get('destination');

    const filter: Record<string, string> = {};
    if (tier) filter.tier = tier;
    if (theme) filter.theme = theme;
    if (destination) filter.destinationId = destination;

    const itineraries = await Itinerary.find(filter).lean();
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
