import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';

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
    const itinerary = await Itinerary.findByIdAndUpdate(params.id, body, { new: true, runValidators: false }).lean();
    if (!itinerary) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(itinerary);
  } catch {
    return NextResponse.json({ error: 'Failed to update itinerary' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Itinerary.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete itinerary' }, { status: 500 });
  }
}
