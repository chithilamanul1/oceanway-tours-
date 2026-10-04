import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models';
import { updateStoreEnquiry, deleteStoreEnquiry } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

function getMongoQuery(id: string) {
  if (mongoose.isValidObjectId(id) && /^[0-9a-fA-F]{24}$/.test(id)) {
    return { $or: [{ _id: id }, { id }] };
  }
  return { id };
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const message = await ContactMessage.findOne(getMongoQuery(params.id)).lean();
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch inquiry', details: err?.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    try {
      await connectDB();
      await ContactMessage.findOneAndUpdate(getMongoQuery(params.id), body, { new: true }).lean();
    } catch (err: any) {
      console.warn('DB update failed in PUT /api/inquiries/[id], persisting to dataStore:', err?.message);
    }

    const updated = updateStoreEnquiry(params.id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update inquiry', details: err?.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    try {
      await connectDB();
      await ContactMessage.findOneAndDelete(getMongoQuery(params.id));
    } catch (err: any) {
      console.warn('DB delete failed in DELETE /api/inquiries/[id]:', err?.message);
    }

    deleteStoreEnquiry(params.id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete inquiry', details: err?.message }, { status: 500 });
  }
}
