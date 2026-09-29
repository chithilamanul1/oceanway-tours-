import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import { BlogPost, Itinerary, Destination } from '@/lib/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oceanway-tours.vercel.app';
  
  let blogUrls: MetadataRoute.Sitemap = [];
  let itineraryUrls: MetadataRoute.Sitemap = [];
  let destinationUrls: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    
    // Fetch all slugs
    const posts = await BlogPost.find({}, 'id updatedAt').lean();
    const itineraries = await Itinerary.find({}, 'id updatedAt').lean();
    const destinations = await Destination.find({}, 'id updatedAt').lean();
    
    blogUrls = posts.map((post: any) => ({
      url: `${baseUrl}/journal/${post.id}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    itineraryUrls = itineraries.map((it: any) => ({
      url: `${baseUrl}/itineraries/${it.id}`,
      lastModified: it.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    
    destinationUrls = destinations.map((dest: any) => ({
      url: `${baseUrl}/destinations/${dest.id || dest.name.toLowerCase()}`, // or whatever route logic destinations use
      lastModified: dest.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  } catch (e) {
    console.error('Failed to generate dynamic sitemap urls', e);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/itineraries`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...itineraryUrls,
    ...blogUrls,
    ...destinationUrls
  ];
}
