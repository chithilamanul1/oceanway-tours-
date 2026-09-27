import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, Mountain, UsersRound } from 'lucide-react';
import { itinerariesSeed } from '@/data/itineraries';
import DayByDay from '@/components/itinerary/DayByDay';

export function generateStaticParams() {
  return itinerariesSeed.map((i) => ({ id: i.id }));
}

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const itinerary = itinerariesSeed.find((item) => item.id === params.id);
  if (!itinerary) notFound();

  return (
    <>
      <section className="bg-forest px-6 py-8 text-canvas lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/itineraries" className="inline-flex items-center gap-2 text-sm text-sand hover:text-canvas">
            <ArrowLeft size={16} /> All journeys
          </Link>
        </div>
      </section>

      <section className="bg-forest text-canvas">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-end px-6 pb-16 pt-10 lg:px-10 lg:py-20">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">
                {itinerary.destinationName}
              </p>
              <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-white">
                {itinerary.tier}
              </span>
              <span className="rounded-full bg-canvas/10 px-3 py-1 text-xs font-medium text-sand">
                {itinerary.theme}
              </span>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl">
              {itinerary.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-sand/90">{itinerary.summary}</p>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-canvas/20 pt-5 text-sm">
              <div>
                <Clock3 size={17} className="text-brand" />
                <p className="mt-2 text-sand/70">Duration</p>
                <p className="font-semibold">{itinerary.duration} days</p>
              </div>
              <div>
                <UsersRound size={17} className="text-brand" />
                <p className="mt-2 text-sand/70">Group</p>
                <p className="font-semibold">{itinerary.groupSize}</p>
              </div>
              <div>
                <Mountain size={17} className="text-brand" />
                <p className="mt-2 text-sand/70">Pace</p>
                <p className="font-semibold">{itinerary.difficulty}</p>
              </div>
            </div>
          </div>
          <img
            src={itinerary.image}
            alt={`${itinerary.title} landscape`}
            className="h-full min-h-80 w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-canvas px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Day-by-Day Itinerary
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest">How the days unfold.</h2>
            <DayByDay dayPlans={itinerary.dayPlans} />
          </div>

          <aside className="h-fit bg-sand p-7 lg:sticky lg:top-8 rounded-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              From USD {itinerary.price.toLocaleString()}
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest">Make this journey your own.</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/70">
              Ask about dates, preferred stays, private experiences, and every detail that matters.
            </p>
            <Link
              href={`/contact?journey=${encodeURIComponent(itinerary.title)}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-forest-light"
            >
              Plan this journey <ArrowUpRight size={16} />
            </Link>
            <div className="mt-6 border-t border-forest/15 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                Included highlights
              </p>
              <ul className="mt-4 space-y-3">
                {itinerary.highlights.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-5 text-charcoal/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-sand px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <span className="flex items-center gap-2 text-sm text-charcoal/70">
            <CalendarDays size={17} /> Best season: {itinerary.season}
          </span>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-brand">
            Create a private version <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
