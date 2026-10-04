import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Destination } from '@/lib/models';

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
    destinations = [...destinations, ...fallback];
  } catch (e) {
    console.error('Failed to load destinationsSeed:', e);
  }

  return NextResponse.json(destinations);
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.id && body.name) {
      body.id = 'dest-' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const destination = await Destination.create(body);
    return NextResponse.json(destination, { status: 201 });
  } catch (error: any) {
    console.warn('DB write failed in POST /api/destinations, returning simulated item:', error?.message);
    try {
      const body = await request.clone().json();
      const mockItem = {
        _id: 'mock-dest-' + Date.now(),
        id: body.id || ('dest-' + (body.name || 'custom').toLowerCase().replace(/[^a-z0-9]+/g, '-')),
        ...body,
      };
      return NextResponse.json(mockItem, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Failed to create destination', message: error?.message }, { status: 500 });
    }
  }
}
