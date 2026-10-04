import type { Metadata } from 'next';
import { ItinerariesClient } from './ItinerariesClient';
import PageHero from '@/components/ui/PageHero';
import { connectDB } from '@/lib/mongodb';
import { Itinerary as ItineraryModel, Destination as DestinationModel } from '@/lib/models';

export const metadata: Metadata = {
  title: 'Holidays & Tours | OceanWay Tours',
  description: 'Explore our best-selling trip packages — Tailor-Made Tours, Small Group Adventures, and Fixed Holiday Getaways across Sri Lanka, Saudi Arabia, and Bahrain.',
};

export const revalidate = 60; // ISR every 60s

export default async function ItinerariesPage() {
  let itineraries: any[] = [];
  let destinations: any[] = [];

  try {
    await connectDB();
    const dbItineraries = await ItineraryModel.find().lean();
    const dbDestinations = await DestinationModel.find().lean();
    
    itineraries = JSON.parse(JSON.stringify(dbItineraries));
    destinations = JSON.parse(JSON.stringify(dbDestinations));
  } catch (error) {
    console.error('MongoDB fetch failed on Itineraries page', error);
  }

  if (!destinations || destinations.length === 0) {
    try {
      const { destinationsSeed } = await import('@/data/destinations');
      destinations = JSON.parse(JSON.stringify(destinationsSeed));
    } catch (e) {}
  }

  const { extraItineraries } = await import('@/data/extraItineraries');
  const extra = JSON.parse(JSON.stringify(extraItineraries));
  const existingIds = new Set(itineraries.map((i: any) => i.id));
  const toAdd = extra.filter((i: any) => !existingIds.has(i.id));
  itineraries = [...itineraries, ...toAdd] as any;

  return (
    <>
      <PageHero
        eyebrow="Holidays & Tours"
        title="Explore Our Best-Selling Trip Packages"
        description="A diverse range of vacation tour packages for every travel style — Tailor-Made private tours, Small Group adventures, and Fixed Holiday Getaways. Every package can be customised to your budget."
        image="https://cdn.magicpatterns.com/patterns/generated-images/8cb0359e-dfc0-47ad-93d0-b1e99cf670bd.jpg"
      />
      <ItinerariesClient itineraries={itineraries} destinations={destinations} />
    </>
  );
}
