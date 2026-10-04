import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { Destination } from '@/lib/models';
import { getStoreDestination, saveStoreDestination, deleteStoreDestination } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

function getMongoQuery(id: string) {
  if (mongoose.isValidObjectId(id) && /^[0-9a-fA-F]{24}$/.test(id)) {
    return { $or: [{ _id: id }, { id }] };
  }
  return { id };
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const stored = getStoreDestination(params.id);
    if (stored) return NextResponse.json(stored);

    try {
      await connectDB();
      const destination = await Destination.findOne(getMongoQuery(params.id)).lean();
      if (destination) return NextResponse.json(destination);
    } catch (dbErr: any) {
      console.warn('DB read failed in GET /api/destinations/[id]:', dbErr?.message);
    }

    const { destinationsSeed } = await import('@/data/destinations');
    const fallback = destinationsSeed.find((d: any) => d.id === params.id || d._id === params.id);
    if (fallback) return NextResponse.json(fallback);

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch destination', details: error?.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const cleanId = body.id || params.id;
    const updateData = { ...body, id: cleanId };

    const { _id, ...cleanForMongo } = updateData;
    const mongoPayload = (mongoose.isValidObjectId(_id) && /^[0-9a-fA-F]{24}$/.test(String(_id)))
      ? { ...cleanForMongo, _id }
      : cleanForMongo;

    let dbUpdated = null;

    try {
      await connectDB();
      dbUpdated = await Destination.findOneAndUpdate(
        getMongoQuery(params.id),
        mongoPayload,
        { new: true, upsert: true, runValidators: false }
      ).lean();
    } catch (dbErr: any) {
      console.warn('DB update failed in PUT /api/destinations/[id], persisting to dataStore:', dbErr?.message);
    }

    const saved = saveStoreDestination(params.id, dbUpdated || updateData);
    return NextResponse.json(saved, { status: 200 });
  } catch (error: any) {
    console.error('Error in PUT /api/destinations/[id]:', error);
    return NextResponse.json({ error: 'Failed to update destination', details: error?.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    try {
      await connectDB();
      await Destination.findOneAndDelete(getMongoQuery(params.id));
    } catch (dbErr: any) {
      console.warn('DB delete failed in DELETE /api/destinations/[id]:', dbErr?.message);
    }

    deleteStoreDestination(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete destination', details: error?.message }, { status: 500 });
  }
}
