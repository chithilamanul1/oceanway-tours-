import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: String,
  name: String, region: String, tag: String, tagline: String,
  description: String, image: String, bestSeason: String,
  gallery: [String], featured: Boolean,
  seoTitle: String, seoDescription: String,
}, { timestamps: true });

export const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

const itinerarySchema = new mongoose.Schema({
  id: String,
  title: String, destinationId: String, destinationName: String,
  duration: Number, groupSize: String, difficulty: String, price: Number,
  season: String, image: String, summary: String,
  highlights: [String], tier: String, theme: String,
  inclusions: [String], exclusions: [String],
  seoTitle: String, seoDescription: String,
  dayPlans: [{
    day: Number, title: String, description: String,
    activities: [String], accommodation: String,
    meals: { breakfast: Boolean, lunch: Boolean, dinner: Boolean },
    transferTime: String
  }]
}, { timestamps: true });

export const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

const blogPostSchema = new mongoose.Schema({
  id: String,
  title: String, excerpt: String, content: [String], author: String,
  date: String, category: String, image: String, readTime: Number,
  seoTitle: String, seoDescription: String,
}, { timestamps: true });

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

const mediaItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: String,
  tags: [String],
}, { timestamps: true });

export const MediaItem = mongoose.models.MediaItem || mongoose.model('MediaItem', mediaItemSchema);

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  travelDates: String,
  travellers: String,
  interest: String,
  message: { type: String, required: true },
  budget: String,
  read: { type: Boolean, default: false },
  funnelStep: { type: Number, default: 1 },
}, { timestamps: true });

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
