import mongoose, { Schema, Model } from 'mongoose';
import { Review } from '@/types/content';

const ReviewSchema = new Schema<Review>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    origin: { type: String, required: true },
    trip: { type: String, required: true },
    quote: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    platform: {
      type: String,
      required: true,
      enum: ['TripAdvisor', 'Google', 'Direct'],
    },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel: Model<Review> =
  mongoose.models.Review || mongoose.model<Review>('Review', ReviewSchema);

export default ReviewModel;
