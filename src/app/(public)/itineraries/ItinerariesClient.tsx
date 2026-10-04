'use client';

import { useMemo, useState } from 'react';
import ItineraryCard from '@/components/cards/ItineraryCard';
import EmptyState from '@/components/ui/EmptyState';
import {
  Destination,
  DestinationTag,
  destinationTags,
  Itinerary,
  TourTier,
  tourTiers,
  TourTheme,
  tourThemes,
} from '@/types/content';

interface Props {
  itineraries: Itinerary[];
  destinations: Destination[];
}

export function ItinerariesClient({ itineraries, destinations }: Props) {
  const [regionFilter, setRegionFilter] = useState<'All' | DestinationTag>('All');
  const [tierFilter, setTierFilter] = useState<'All' | TourTier>('All');
  const [themeFilter, setThemeFilter] = useState<'All' | TourTheme>('All');

  const filtered = useMemo(() => {
    let result = itineraries;
    if (regionFilter !== 'All') {
      const destIds = destinations.filter((d) => d.tag === regionFilter).map((d) => d.id);
      result = result.filter((item) => destIds.includes(item.destinationId) || item.destinationName === regionFilter);
    }
    if (tierFilter !== 'All') {
      result = result.filter((item) => item.tier === tierFilter);
    }
    if (themeFilter !== 'All') {
      result = result.filter((item) => item.theme === themeFilter);
    }
    return result;
  }, [itineraries, destinations, regionFilter, tierFilter, themeFilter]);

  return (
    <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Region filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by region">
          {(['All', ...destinationTags] as Array<'All' | DestinationTag>).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegionFilter(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                regionFilter === item ? 'bg-ink text-white' : 'bg-mist text-ink hover:bg-brand-light'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Tier filter */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by tour tier">
          {(['All', ...tourTiers] as Array<'All' | TourTier>).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTierFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                tierFilter === item
                  ? 'bg-brand text-white'
                  : 'border border-line text-charcoal hover:border-brand'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Theme filter */}
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by theme">
          {(['All', ...tourThemes] as Array<'All' | TourTheme>).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setThemeFilter(item)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                themeFilter === item
                  ? 'bg-forest text-canvas'
                  : 'border border-line text-charcoal hover:border-forest'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="No packages here yet"
              message="Contact our team and we will build a tailor-made package for this region."
            />
          </div>
        )}
      </div>
    </section>
  );
}
