import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GalleryViewer, { GalleryPhoto } from '@/components/gallery/GalleryViewer';
import { mediaSeed } from '@/data/mediaSeed';
import { destinationsSeed } from '@/data/destinations';
import { itinerariesSeed } from '@/data/itineraries';
import { extraItineraries } from '@/data/extraItineraries';
import { getStoreAllMedia, mergeMediaWithStore } from '@/lib/dataStore';
import { connectDB } from '@/lib/mongodb';
import { MediaItem } from '@/lib/models';

export const metadata: Metadata = {
  title: 'Photo Gallery | OceanWay Tours',
  description:
    'Explore high-resolution travel photography across Sri Lanka, Saudi Arabia, and Bahrain. Discover wildlife safaris, ancient kingdoms, and authentic moments curated by OceanWay Tours.',
  openGraph: {
    title: 'Photo Gallery | OceanWay Tours',
    description:
      'Immerse yourself in stunning visual stories from Sri Lanka, Saudi Arabia, Bahrain, and the Indian Ocean.',
    images: ['/tours/saman_villas.jpg'],
  },
};

export const revalidate = 60; // Refresh every 60s

export default async function GalleryPage() {
  let dbItems: any[] = [];
  try {
    await connectDB();
    dbItems = await MediaItem.find().sort({ createdAt: -1 }).lean();
  } catch {
    // DB offline, fall back to dataStore & seeds
  }

  // 1. Gather all direct media items
  const combinedMedia = mergeMediaWithStore([...dbItems, ...mediaSeed]);

  // Map to GalleryPhoto format
  const photoMap = new Map<string, GalleryPhoto>();

  for (const m of combinedMedia) {
    if (m.url && !photoMap.has(m.url)) {
      photoMap.set(m.url, {
        _id: String(m._id || m.id || m.url),
        url: m.url,
        name: m.name || 'OceanWay Discovery',
        tags: Array.isArray(m.tags) && m.tags.length > 0 ? m.tags : ['Gallery'],
        createdAt: m.createdAt,
      });
    }
  }

  // 2. Add destination gallery images
  for (const dest of destinationsSeed) {
    if (dest.image && !photoMap.has(dest.image)) {
      photoMap.set(dest.image, {
        _id: `dest-img-${dest.id}`,
        url: dest.image,
        name: dest.name,
        tags: [dest.tag, 'Destinations', dest.region],
      });
    }
    if (Array.isArray((dest as any).gallery)) {
      (dest as any).gallery.forEach((gUrl: string, idx: number) => {
        if (gUrl && !photoMap.has(gUrl)) {
          photoMap.set(gUrl, {
            _id: `dest-gal-${dest.id}-${idx}`,
            url: gUrl,
            name: `${dest.name} - Gallery`,
            tags: [dest.tag, 'Destinations'],
          });
        }
      });
    }
  }

  // 3. Add itinerary hero images
  for (const itin of [...extraItineraries, ...itinerariesSeed]) {
    if (itin.image && !photoMap.has(itin.image)) {
      photoMap.set(itin.image, {
        _id: `itin-img-${itin.id}`,
        url: itin.image,
        name: itin.title,
        tags: [itin.destinationName || 'Tours', itin.theme || 'Discovery'],
      });
    }
  }

  const initialPhotos = Array.from(photoMap.values());

  return (
    <div className="bg-canvas min-h-screen">
      {/* Hero Banner */}
      <PageHero
        eyebrow="Visual Journal"
        title="Extraordinary Moments Captured"
        description="Experience the raw beauty of untamed wilderness, ancient UNESCO citadels, serene tea valleys, and azure coastlines through the lens of OceanWay Tours."
        image="/tours/saman_villas.jpg"
      />

      {/* Interactive Gallery Viewer */}
      <GalleryViewer initialPhotos={initialPhotos} />

      {/* Call to Action Section */}
      <section className="bg-forest text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/30 border border-brand/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Turn These Views Into Your Reality
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Inspired by What You See?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light">
            Every sight featured in our gallery can be woven into your private, tailor-made itinerary with personal chauffeur guides and luxury handpicked accommodation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-forest transition-all shadow-lg"
            >
              Request Custom Itinerary
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/itineraries"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Browse Tour Packages
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/15 text-xs text-white/70 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Registered Tour Operator</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Handcrafted Private Itineraries</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HeartHandshake className="w-4 h-4 text-sky-400 shrink-0" />
              <span>24/7 Dedicated Concierge Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
