import type { Metadata } from 'next';
import { destinationsSeed } from '@/data/destinations';
import { DestinationsClient } from './DestinationsClient';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore top destinations across Sri Lanka, Saudi Arabia, and Bahrain.',
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Top Destinations Around the World"
        description="Sri Lanka travel specialists with a regional network—explore Sri Lanka, Saudi Arabia, and Bahrain with tailor-made holidays, guided tours, and weekend getaways."
        image="https://cdn.magicpatterns.com/patterns/generated-images/cb3b6cb8-ff31-40c7-b69b-f853763e43dc.jpg"
      />
      <DestinationsClient destinations={destinationsSeed} />
    </>
  );
}
