import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';
import posts from '../../../../scraped_blogs.json';

export async function GET() {
  try {
    await connectDB();
    for (const post of posts) {
      await BlogPost.updateOne({ id: post.id }, { $set: post }, { upsert: true });
    }
    return NextResponse.json({ success: true, count: posts.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
