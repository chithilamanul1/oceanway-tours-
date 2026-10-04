import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';
import { mergeBlogPostsWithStore, saveStoreBlogPost } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  let posts: any[] = [];
  try {
    await connectDB();
    posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
  } catch (error: any) {
    console.warn('DB connect failed in GET /api/blog, falling back to static seed:', error?.message);
  }

  try {
    const { blogPostsSeed } = await import('@/data/blogPosts');
    const existingIds = new Set(posts.map((p: any) => p.id || p._id));
    const fallback = blogPostsSeed.filter((p: any) => !existingIds.has(p.id));
    const combined = [...posts, ...fallback];
    const merged = mergeBlogPostsWithStore(combined);

    return NextResponse.json(merged);
  } catch (e) {
    console.error('Failed to load blogPostsSeed:', e);
    return NextResponse.json(mergeBlogPostsWithStore(posts));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id && body.title) {
      body.id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    let created = null;
    try {
      await connectDB();
      created = await BlogPost.create(body);
      created = created.toObject ? created.toObject() : created;
    } catch (dbErr: any) {
      console.warn('DB write failed in POST /api/blog, persisting to dataStore:', dbErr?.message);
    }

    const saved = saveStoreBlogPost(body.id, created || {
      _id: 'post-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...body,
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create blog post', message: error?.message }, { status: 500 });
  }
}
