import type { Metadata } from 'next';
import { itinerariesSeed } from '@/data/itineraries';
import { destinationsSeed } from '@/data/destinations';
import { ItinerariesClient } from './ItinerariesClient';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Holidays & Tours',
  description: 'Explore our best-selling trip packages — Tailor-Made Tours, Small Group Adventures, and Fixed Holiday Getaways across Sri Lanka, Saudi Arabia, and Bahrain.',
};

import { connectDB } from '@/lib/mongodb';
import { Itinerary as ItineraryModel, Destination as DestinationModel } from '@/lib/models';

export const revalidate = 60;

export default async function ItinerariesPage() {
  let itineraries = itinerariesSeed;
  let destinations = destinationsSeed;

  try {
    await connectDB();
    const dbItineraries = await ItineraryModel.find().lean();
    const dbDestinations = await DestinationModel.find().lean();
    if (dbItineraries.length > 0) itineraries = JSON.parse(JSON.stringify(dbItineraries));
    if (dbDestinations.length > 0) destinations = JSON.parse(JSON.stringify(dbDestinations));
  } catch (error) {
    console.error('MongoDB fetch failed, using seed data.', error);
  }

  return (
    <>
      <PageHero
        eyebrow="Holidays & Tours"
        title="Explore Our Best-Selling Trip Packages"
        description="A diverse range of vacation tour packages for every travel style—Tailor-Made private tours, Small Group adventures, and Fixed Holiday Getaways. Every package can be customised to your budget."
        image="https://cdn.magicpatterns.com/patterns/generated-images/8cb0359e-dfc0-47ad-93d0-b1e99cf670bd.jpg"
      />
      <ItinerariesClient itineraries={itineraries} destinations={destinations} />
    </>
  );
}
