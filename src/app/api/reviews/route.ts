import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { reviewsSeed } from '@/data/reviews';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

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
    if (reviews && reviews.length > 0) {
      return NextResponse.json(reviews);
    }
  } catch (error: any) {
    console.warn('DB connect failed in GET /api/reviews, using fallback:', error?.message);
  }

  return NextResponse.json(reviewsSeed);
}
