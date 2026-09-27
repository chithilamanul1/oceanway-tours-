import mongoose, { Schema, Model } from 'mongoose';
import { Itinerary, DayPlan } from '@/types/content';

const DayPlanSchema = new Schema<DayPlan>(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    activities: [{ type: String, required: true }],
    accommodation: { type: String, required: true },
    meals: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false },
    },
    transferTime: { type: String },
  },
  { _id: false }
);

const ItinerarySchema = new Schema<Itinerary>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    destinationId: { type: String, required: true },
    destinationName: { type: String, required: true },
    duration: { type: Number, required: true },
    groupSize: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Moderate', 'Challenging'],
    },
    price: { type: Number, required: true },
    season: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    highlights: [{ type: String, required: true }],
    tier: {
      type: String,
      required: true,
      enum: ['Tailor-Made', 'Small Group', 'Fixed Getaway'],
    },
    theme: {
      type: String,
      required: true,
      enum: ['Honeymoon', 'Wildlife', 'Adventure', 'Culture', 'History'],
    },
    dayPlans: { type: [DayPlanSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const ItineraryModel: Model<Itinerary> =
  mongoose.models.Itinerary || mongoose.model<Itinerary>('Itinerary', ItinerarySchema);

export default ItineraryModel;
