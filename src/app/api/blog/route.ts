import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts', details: error?.message || String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.id && body.title) {
      body.id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const post = await BlogPost.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create blog post', message: error.message }, { status: 500 });
  }
}

