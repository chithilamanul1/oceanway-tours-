import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { MediaItem } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const items = await MediaItem.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch media', details: error?.message || String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    // body: { url, name, tags }
    const item = await MediaItem.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to add media item', details: error?.message || String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await MediaItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to delete media item', details: error?.message || String(error) }, { status: 500 });
  }
}

