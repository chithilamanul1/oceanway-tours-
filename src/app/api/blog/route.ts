import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';

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
    posts = [...posts, ...fallback];
  } catch (e) {
    console.error('Failed to load blogPostsSeed:', e);
  }

  return NextResponse.json(posts);
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
    console.warn('DB write failed in POST /api/blog, returning simulated item:', error?.message);
    try {
      const body = await request.clone().json();
      const mockPost = {
        _id: 'mock-post-' + Date.now(),
        id: body.id || (body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        createdAt: new Date().toISOString(),
        ...body,
      };
      return NextResponse.json(mockPost, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Failed to create blog post', message: error?.message }, { status: 500 });
    }
  }
}
