import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';
import { mergeItinerariesWithStore, saveStoreItinerary } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  let itineraries: any[] = [];
  try {
    await connectDB();
    itineraries = await Itinerary.find().lean();
  } catch (error: any) {
    console.warn('DB connect failed in GET /api/itineraries, falling back to static seed:', error?.message);
  }

  try {
    const { extraItineraries } = await import('@/data/extraItineraries');
    const existingIds = new Set(itineraries.map((i: any) => i.id || i._id));
    const unseeded = extraItineraries.filter((i: any) => !existingIds.has(i.id));
    const combined = [...itineraries, ...unseeded];

    const merged = mergeItinerariesWithStore(combined);
    const filtered = merged.filter((i: any) => !i.id.startsWith('itin-'));

    return NextResponse.json(filtered.length > 0 ? filtered : extraItineraries);
  } catch (err: any) {
    console.error('Error in GET /api/itineraries:', err);
    return NextResponse.json({ error: 'Failed to fetch itineraries', details: err?.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id && body.title) {
      body.id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!body.destinationId && body.destinationName) {
      body.destinationId = 'dest-' + body.destinationName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    let created = null;
    try {
      await connectDB();
      created = await Itinerary.create(body);
      created = created.toObject ? created.toObject() : created;
    } catch (dbErr: any) {
      console.warn('DB write failed in POST /api/itineraries, persisting to dataStore:', dbErr?.message);
    }

    const saved = saveStoreItinerary(body.id, created || { _id: 'itin-' + Date.now(), ...body });
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/itineraries:', error);
    return NextResponse.json({ error: 'Failed to create itinerary', message: error.message }, { status: 500 });
  }
}
