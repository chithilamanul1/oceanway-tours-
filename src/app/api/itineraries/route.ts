import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';

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
