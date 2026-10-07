import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost, Itinerary, Destination, MediaItem } from '@/lib/models';
import { blogPostsSeed } from '@/data/blogPosts';
import { destinationsSeed } from '@/data/destinations';
import { extraItineraries } from '@/data/extraItineraries';
import { mediaSeed } from '@/data/mediaSeed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    await BlogPost.deleteMany({});
    await BlogPost.insertMany(blogPostsSeed);

    await Destination.deleteMany({});
    await Destination.insertMany(destinationsSeed);

    await Itinerary.deleteMany({});
    await Itinerary.insertMany(extraItineraries);

    await MediaItem.deleteMany({});
    const cleanMediaSeed = mediaSeed.map(({ _id, ...rest }) => rest);
    await MediaItem.insertMany(cleanMediaSeed);

    return NextResponse.json({ success: true, message: 'Synced clean DB with all collections' });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
