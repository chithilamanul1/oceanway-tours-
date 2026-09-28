import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Destination } from '@/lib/models';

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
    
    if (!body.id && body.name) {
      body.id = 'dest-' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const destination = await Destination.create(body);
    return NextResponse.json(destination, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create destination', message: error.message }, { status: 500 });
  }
}
