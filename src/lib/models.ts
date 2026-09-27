import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: String,
  name: String, region: String, tag: String, tagline: String,
  description: String, image: String, bestSeason: String,
}, { timestamps: true });

export const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

const itinerarySchema = new mongoose.Schema({
  id: String,
  title: String, destinationId: String, destinationName: String,
  duration: Number, groupSize: String, difficulty: String, price: Number,
  season: String, image: String, summary: String, highlights: [String],
  tier: String, theme: String,
  dayPlans: [{ day: Number, title: String, description: String, activities: [String], accommodation: String, meals: { breakfast: Boolean, lunch: Boolean, dinner: Boolean }, transferTime: String }]
}, { timestamps: true });

export const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

const blogPostSchema = new mongoose.Schema({
  id: String,
  title: String, excerpt: String, content: [String], author: String,
  date: String, category: String, image: String, readTime: Number
}, { timestamps: true });

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
