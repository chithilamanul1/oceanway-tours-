import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: String, origin: String, trip: String,
  quote: String, rating: Number,
  platform: { type: String, enum: ['TripAdvisor', 'Google', 'Direct'] },
  avatar: String,
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find().lean();
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews', details: error?.message || String(error) }, { status: 500 });
  }
}

