import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, verifyAuth } from '@/lib/auth';
import { AdminClient } from './AdminClient';
import AdminLogin from './AdminLogin';
import { connectDB } from '@/lib/mongodb';
import { Destination, Itinerary, BlogPost } from '@/lib/models';
import mongoose from 'mongoose';

export const metadata: Metadata = {
  title: 'Admin Desk | OceanWay Tours',
  description: 'OceanWay Tours secure admin panel.',
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await verifyAuth(token);
      isAuthenticated = true;
    } catch (e) {
      // Token invalid or expired
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch real counts from DB for the dashboard, with fallback to seed counts
  let stats = {
    destinations: 14,
    itineraries: 12,
    posts: 6,
    enquiries: 0,
  };

  try {
    await connectDB();
    const destCount = await Destination.countDocuments();
    if (destCount > 0) stats.destinations = destCount;
    const itinCount = await Itinerary.countDocuments();
    if (itinCount > 0) stats.itineraries = itinCount;
    const postCount = await BlogPost.countDocuments();
    if (postCount > 0) stats.posts = postCount;
    
    const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', new mongoose.Schema({}, { strict: false }));
    stats.enquiries = await Enquiry.countDocuments();
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
  }

  return <AdminClient initialStats={stats} />;
}
