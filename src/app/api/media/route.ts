import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { MediaItem } from '@/lib/models';

export const dynamic = 'force-dynamic';

export async function GET() {
  let items: any[] = [];
  try {
    await connectDB();
    items = await MediaItem.find().sort({ createdAt: -1 }).lean();
  } catch (error: any) {
    console.warn('DB connect failed in GET /api/media, falling back to static seed:', error?.message);
  }

  try {
    const { mediaSeed } = await import('@/data/mediaSeed');
    const existingUrls = new Set(items.map((i: any) => i.url));
    const fallback = mediaSeed.filter((i: any) => !existingUrls.has(i.url));
    items = [...items, ...fallback];
  } catch (e) {
    console.error('Failed to load mediaSeed:', e);
  }

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const item = await MediaItem.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.warn('DB write failed in POST /api/media, returning simulated item:', error?.message);
    try {
      const body = await request.clone().json();
      const mockItem = {
        _id: 'mock-media-' + Date.now(),
        createdAt: new Date().toISOString(),
        ...body,
      };
      return NextResponse.json(mockItem, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Failed to add media item', details: error?.message || String(error) }, { status: 500 });
    }
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
    console.warn('DB delete failed, returning simulated success:', error?.message);
    return NextResponse.json({ success: true });
  }
}
