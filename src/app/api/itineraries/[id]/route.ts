import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';
import { getStoreItinerary, saveStoreItinerary, deleteStoreItinerary } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

function getMongoQuery(id: string) {
  if (mongoose.isValidObjectId(id) && /^[0-9a-fA-F]{24}$/.test(id)) {
    return { $or: [{ _id: id }, { id }] };
  }
  return { id };
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    // 1. Check persistent overrides store first
    const stored = getStoreItinerary(params.id);
    if (stored) {
      return NextResponse.json(stored);
    }

    // 2. Try MongoDB
    try {
      await connectDB();
      const itinerary = await Itinerary.findOne(getMongoQuery(params.id)).lean();
      if (itinerary) return NextResponse.json(itinerary);
    } catch (dbErr: any) {
      console.warn('DB read failed in GET /api/itineraries/[id]:', dbErr?.message);
    }

    // 3. Fallback to extraItineraries
    const { extraItineraries } = await import('@/data/extraItineraries');
    const fallback = extraItineraries.find((i: any) => i.id === params.id || i._id === params.id);
    if (fallback) return NextResponse.json(fallback);

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch itinerary', details: error?.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const cleanId = body.id || params.id;
    const updateData = { ...body, id: cleanId };

    // Strip non-ObjectId _id for MongoDB to prevent CastError
    const { _id, ...cleanForMongo } = updateData;
    const mongoPayload = (mongoose.isValidObjectId(_id) && /^[0-9a-fA-F]{24}$/.test(String(_id)))
      ? { ...cleanForMongo, _id }
      : cleanForMongo;

    let dbUpdated = null;

    // 1. Try updating in MongoDB
    try {
      await connectDB();
      dbUpdated = await Itinerary.findOneAndUpdate(
        getMongoQuery(params.id),
        mongoPayload,
        { new: true, upsert: true, runValidators: false }
      ).lean();
    } catch (dbErr: any) {
      console.warn('DB update failed in PUT /api/itineraries/[id], persisting to dataStore:', dbErr?.message);
    }

    // 2. Always persist to data store so changes are immediately active
    const saved = saveStoreItinerary(params.id, dbUpdated || updateData);

    return NextResponse.json(saved, { status: 200 });
  } catch (error: any) {
    console.error('Critical error in PUT /api/itineraries/[id]:', error);
    return NextResponse.json({ error: 'Failed to update itinerary', details: error?.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    try {
      await connectDB();
      await Itinerary.findOneAndDelete(getMongoQuery(params.id));
    } catch (dbErr: any) {
      console.warn('DB delete failed in DELETE /api/itineraries/[id]:', dbErr?.message);
    }

    deleteStoreItinerary(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete itinerary', details: error?.message }, { status: 500 });
  }
}
