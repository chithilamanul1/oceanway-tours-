'use client';

import { useMemo, useState } from 'react';
import DestinationCard from '@/components/cards/DestinationCard';
import EmptyState from '@/components/ui/EmptyState';
import { Destination, DestinationTag, destinationTags } from '@/types/content';

export function DestinationsClient({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<'All' | DestinationTag>('All');
  const filtered = useMemo(
    () => (filter === 'All' ? destinations : destinations.filter((item) => item.tag === filter)),
    [destinations, filter]
  );

  return (
    <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter destinations by region">
          {(['All', ...destinationTags] as Array<'All' | DestinationTag>).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                filter === item ? 'bg-ink text-white' : 'bg-mist text-ink hover:bg-brand-light'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState title="Coming soon" message="Ask our consultants about tailor-made trips to this region." />
          </div>
        )}
      </div>
    </section>
  );
}
