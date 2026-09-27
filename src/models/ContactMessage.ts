import mongoose, { Schema, Model } from 'mongoose';
import { ContactMessage } from '@/types/content';

const ContactMessageSchema = new Schema<ContactMessage>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    travelDates: { type: String },
    travellers: { type: String },
    interest: { type: String, required: true },
    message: { type: String, required: true },
    budget: { type: String },
    submittedAt: { type: String, required: true },
    read: { type: Boolean, default: false },
    funnelStep: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessageModel: Model<ContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<ContactMessage>('ContactMessage', ContactMessageSchema);

export default ContactMessageModel;
