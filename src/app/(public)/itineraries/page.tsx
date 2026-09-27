import type { Metadata } from 'next';
import { itinerariesSeed } from '@/data/itineraries';
import { destinationsSeed } from '@/data/destinations';
import { ItinerariesClient } from './ItinerariesClient';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Holidays & Tours',
  description: 'Explore our best-selling trip packages — Tailor-Made Tours, Small Group Adventures, and Fixed Holiday Getaways across Sri Lanka, Saudi Arabia, and Bahrain.',
};

export default function ItinerariesPage() {
  return (
    <>
      <PageHero
        eyebrow="Holidays & Tours"
        title="Explore Our Best-Selling Trip Packages"
        description="A diverse range of vacation tour packages for every travel style—Tailor-Made private tours, Small Group adventures, and Fixed Holiday Getaways. Every package can be customised to your budget."
        image="https://cdn.magicpatterns.com/patterns/generated-images/8cb0359e-dfc0-47ad-93d0-b1e99cf670bd.jpg"
      />
      <ItinerariesClient itineraries={itinerariesSeed} destinations={destinationsSeed} />
    </>
  );
}
