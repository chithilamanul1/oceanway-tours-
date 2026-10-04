import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { destinationsSeed } from '@/data/destinations';
import { itinerariesSeed } from '@/data/itineraries';
import ItineraryCard from '@/components/cards/ItineraryCard';
import SectionIntro from '@/components/ui/SectionIntro';

export function generateStaticParams() {
  return destinationsSeed.map((d) => ({ id: d.id }));
}

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const destination = destinationsSeed.find((item) => item.id === params.id);
  if (!destination) notFound();

  const relatedJourneys = itinerariesSeed.filter(
    (item) => item.destinationId === destination.id || item.destinationName === destination.tag || item.destinationName === destination.name
  );

  return (
    <>
      <section className="bg-forest px-6 py-8 text-canvas lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm text-sand hover:text-canvas">
            <ArrowLeft size={16} aria-hidden="true" /> All destinations
          </Link>
        </div>
      </section>

      <section className="bg-forest text-canvas">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-end px-6 pb-16 pt-10 lg:px-10 lg:py-20">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              <MapPin size={14} aria-hidden="true" /> {destination.region}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl">
              {destination.name}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-sand/90">{destination.tagline}</p>
            <dl className="mt-10 flex gap-10 border-t border-canvas/20 pt-5 text-sm">
              <div>
                <dt className="text-sand/70">Best season</dt>
                <dd className="mt-1 font-semibold">{destination.bestSeason}</dd>
              </div>
              <div>
                <dt className="text-sand/70">Region</dt>
                <dd className="mt-1 font-semibold">{destination.tag}</dd>
              </div>
            </dl>
          </div>
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.region}`}
            className="h-full min-h-80 w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-canvas px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <SectionIntro eyebrow="A sense of place" title="The long version is always better." align="left">
            <p>{destination.description}</p>
          </SectionIntro>
          <div className="border-l-2 border-brand pl-6 text-lg leading-8 text-charcoal/80 lg:pt-10">
            Our trusted local hosts shape the details that make a place feel personal—from private
            access and exceptional tables to the quiet corners most guests never find.
          </div>
        </div>
      </section>

      <section className="bg-sand px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionIntro eyebrow="Journeys here" title="Experience it your way." align="left" />
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-brand">
              Create a bespoke journey <ArrowUpRight size={16} />
            </Link>
          </div>
          {relatedJourneys.length ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {relatedJourneys.map((journey) => (
                <ItineraryCard key={journey.id} itinerary={journey} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-line bg-canvas p-8">
              <CalendarDays className="text-brand" aria-hidden="true" />
              <p className="mt-3 text-charcoal/70">
                We are currently designing a private Oceanway experience here.{' '}
                <Link href="/contact" className="font-semibold text-forest underline">
                  Ask us about bespoke planning.
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
