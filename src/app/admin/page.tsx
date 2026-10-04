import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, verifyAuth } from '@/lib/auth';
import { AdminClient } from './AdminClient';
import AdminLogin from './AdminLogin';
import { connectDB } from '@/lib/mongodb';
import { Destination, Itinerary, BlogPost, ContactMessage } from '@/lib/models';
import {
  mergeItinerariesWithStore,
  mergeDestinationsWithStore,
  mergeBlogPostsWithStore,
  getStoreEnquiries
} from '@/lib/dataStore';

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

  const { destinationsSeed } = await import('@/data/destinations');
  const { extraItineraries } = await import('@/data/extraItineraries');
  const { blogPostsSeed } = await import('@/data/blogPosts');

  const liveItineraries = mergeItinerariesWithStore(extraItineraries).filter((i: any) => !i.id.startsWith('itin-'));
  const liveDestinations = mergeDestinationsWithStore(destinationsSeed);
  const livePosts = mergeBlogPostsWithStore(blogPostsSeed);
  const liveEnquiries = getStoreEnquiries();

  const stats = {
    destinations: liveDestinations.length,
    itineraries: liveItineraries.length,
    posts: livePosts.length,
    enquiries: liveEnquiries.length,
  };

  try {
    await connectDB();
    const destCount = await Destination.countDocuments();
    if (destCount > 0) stats.destinations = destCount;
    const itinCount = await Itinerary.countDocuments();
    if (itinCount > 0) stats.itineraries = itinCount;
    const postCount = await BlogPost.countDocuments();
    if (postCount > 0) stats.posts = postCount;
    const enqCount = await ContactMessage.countDocuments();
    if (enqCount > 0) stats.enquiries = enqCount;
  } catch (error) {
    // Mongo offline - using live dataStore stats
  }

  return <AdminClient initialStats={stats} />;
}
