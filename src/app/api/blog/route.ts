import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: String, excerpt: String, content: [String],
  author: String, date: String, category: String,
  image: String, readTime: Number,
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find().sort({ date: -1 }).lean();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const post = await BlogPost.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
