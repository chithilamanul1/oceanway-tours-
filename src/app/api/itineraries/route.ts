import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const itineraries = await Itinerary.find().lean();
    const { extraItineraries } = await import('@/data/extraItineraries');
    const existingIds = new Set(itineraries.map((i: any) => i.id));
    const merged = [...itineraries, ...extraItineraries.filter((i: any) => !existingIds.has(i.id))];
    const filtered = merged.filter((i: any) => !i.id.startsWith('itin-'));
    return NextResponse.json(filtered.length > 0 ? filtered : extraItineraries);
  } catch (error: any) {
    console.warn('API Warning in GET /api/itineraries:', error?.message);
    try {
      const { extraItineraries } = await import('@/data/extraItineraries');
      return NextResponse.json(extraItineraries.filter((i: any) => !i.id.startsWith('itin-')));
    } catch (importError) {
      return NextResponse.json({ error: 'Failed to fetch itineraries and fallback failed', details: error?.message || String(error) }, { status: 500 });
    }
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
