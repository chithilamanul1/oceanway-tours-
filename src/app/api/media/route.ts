import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { MediaItem } from '@/lib/models';
import { mergeMediaWithStore, saveStoreMedia, deleteStoreMedia } from '@/lib/dataStore';

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

  // Merge with any uploaded/modified items in the local dataStore
  items = mergeMediaWithStore(items);

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.url) {
      return NextResponse.json({ error: 'Image URL or data is required' }, { status: 400 });
    }

    let savedItem: any = null;

    try {
      await connectDB();
      savedItem = await MediaItem.create(body);
      if (savedItem && savedItem.toObject) {
        savedItem = savedItem.toObject();
      }
    } catch (error: any) {
      console.warn('DB write failed in POST /api/media, persisting to local store:', error?.message);
    }

    // Always persist to local store (ensures offline persistence & reload durability)
    const storeItem = saveStoreMedia({
      ...body,
      _id: savedItem?._id ? String(savedItem._id) : undefined,
    });

    return NextResponse.json(storeItem, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/media:', error);
    return NextResponse.json(
      { error: 'Failed to add media item', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id || body?._id;
      } catch {
        // no body
      }
    }

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      await connectDB();
      await MediaItem.findByIdAndDelete(id);
    } catch (error: any) {
      console.warn('DB delete failed, deleting from local store:', error?.message);
    }

    deleteStoreMedia(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in DELETE /api/media:', error);
    return NextResponse.json({ success: true });
  }
}

