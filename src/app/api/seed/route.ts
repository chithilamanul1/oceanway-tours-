import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost, Itinerary } from '@/lib/models';
import { blogPostsSeed } from '@/data/blogPosts';
import { itinerariesSeed } from '@/data/itineraries';

export async function GET() {
    try {
        await connectDB();
        await BlogPost.deleteMany({});
        await BlogPost.insertMany(blogPostsSeed);
        
        await Itinerary.deleteMany({});
        await Itinerary.insertMany(itinerariesSeed);
        
        return NextResponse.json({ success: true, message: 'Synced clean DB' });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
