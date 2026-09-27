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

  // Fetch real counts from DB for the dashboard
  let stats = {
    destinations: 0,
    itineraries: 0,
    posts: 0,
    enquiries: 0,
  };

  try {
    await connectDB();
    stats.destinations = await Destination.countDocuments();
    stats.itineraries = await Itinerary.countDocuments();
    stats.posts = await BlogPost.countDocuments();
    
    // Check if Enquiry model exists, if not use mongoose.models or define a simple one
    const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', new mongoose.Schema({}, { strict: false }));
    stats.enquiries = await Enquiry.countDocuments();
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
  }

  return <AdminClient initialStats={stats} />;
}
