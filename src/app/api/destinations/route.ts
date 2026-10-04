import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Destination } from '@/lib/models';
import { mergeDestinationsWithStore, saveStoreDestination } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  let destinations: any[] = [];
  try {
    await connectDB();
    destinations = await Destination.find().lean();
  } catch (error: any) {
    console.warn('DB connect failed in GET /api/destinations, falling back to static seed:', error?.message);
  }

  try {
    const { destinationsSeed } = await import('@/data/destinations');
    const existingIds = new Set(destinations.map((d: any) => d.id || d._id));
    const fallback = destinationsSeed.filter((d: any) => !existingIds.has(d.id));
    const combined = [...destinations, ...fallback];
    const merged = mergeDestinationsWithStore(combined);

    return NextResponse.json(merged);
  } catch (e) {
    console.error('Failed to load destinationsSeed:', e);
    return NextResponse.json(mergeDestinationsWithStore(destinations));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id && body.name) {
      body.id = 'dest-' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    let created = null;
    try {
      await connectDB();
      created = await Destination.create(body);
      created = created.toObject ? created.toObject() : created;
    } catch (dbErr: any) {
      console.warn('DB write failed in POST /api/destinations, persisting to dataStore:', dbErr?.message);
    }

    const saved = saveStoreDestination(body.id, created || { _id: 'dest-' + Date.now(), ...body });
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create destination', message: error?.message }, { status: 500 });
  }
}
