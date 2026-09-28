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
    
    if (!body.id && body.title) {
      body.id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!body.destinationId && body.destinationName) {
      body.destinationId = 'dest-' + body.destinationName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const itinerary = await Itinerary.create(body);
    return NextResponse.json(itinerary, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create itinerary', message: error.message }, { status: 500 });
  }
}
