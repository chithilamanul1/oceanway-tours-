import mongoose, { Schema, Model } from 'mongoose';
import { Destination } from '@/types/content';

const DestinationSchema = new Schema<Destination>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    region: { type: String, required: true },
    tag: {
      type: String,
      required: true,
      enum: ['Sri Lanka', 'Saudi Arabia', 'Bahrain'],
    },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    bestSeason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const DestinationModel: Model<Destination> =
  mongoose.models.Destination || mongoose.model<Destination>('Destination', DestinationSchema);

export default DestinationModel;
