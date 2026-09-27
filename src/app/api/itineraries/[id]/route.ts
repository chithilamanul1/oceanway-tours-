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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const itinerary = await Itinerary.findById(params.id).lean();
    if (!itinerary) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(itinerary);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch itinerary' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const itinerary = await Itinerary.findByIdAndUpdate(params.id, body, { new: true }).lean();
    if (!itinerary) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(itinerary);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Itinerary.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
