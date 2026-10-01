import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, Mountain, UsersRound } from 'lucide-react';
import DayByDay from '@/components/itinerary/DayByDay';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR every 60s

export async function generateStaticParams() {
  let dbItems: any[] = [];
  try {
    await connectDB();
    dbItems = (await Itinerary.find({}, 'id').lean()) as any[];
  } catch (error) {
    console.warn('Skipping DB static generation due to error');
  }
  
  const { extraItineraries } = await import('@/data/extraItineraries');
  const allIds = new Set(dbItems.map((i: any) => i.id));
  extraItineraries.forEach(i => allIds.add(i.id));

  return Array.from(allIds).map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let item = null;
  try {
    await connectDB();
    item = (await Itinerary.findOne({ id: params.id }).lean()) as any;
  } catch (e) { }

  if (!item) {
    const { extraItineraries } = await import('@/data/extraItineraries');
    item = extraItineraries.find(i => i.id === params.id) as any;
  }

  if (!item) return { title: 'Not Found' };
  
  return {
    title: item.seoTitle || `${item.title} | OceanWay Tours`,
    description: item.seoDescription || item.summary,
    openGraph: {
      title: item.seoTitle || item.title,
      description: item.seoDescription || item.summary,
      images: item.image ? [{ url: item.image }] : undefined,
    }
  };
}

export default async function ItineraryDetailPage({ params }: { params: { id: string } }) {
  let itinerary = null;
  try {
    await connectDB();
    itinerary = (await Itinerary.findOne({ id: params.id }).lean()) as any;
  } catch (error) {
    console.warn('DB error, falling back to static');
  }

  if (!itinerary) {
    const { extraItineraries } = await import('@/data/extraItineraries');
    itinerary = extraItineraries.find((i: any) => i.id === params.id) as any;
  }

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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
                {itinerary.destinationName} • {itinerary.tier}
              </p>
              <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                {itinerary.title}
              </h1>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-canvas/70">
              {itinerary.summary}
            </p>

            <div className="flex flex-wrap gap-8 py-4">
              <div className="flex items-center gap-3">
                <Clock3 className="text-terracotta" size={24} />
                <div>
                  <p className="text-xs font-medium text-canvas/60">Duration</p>
                  <p className="font-semibold">{itinerary.duration} Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UsersRound className="text-terracotta" size={24} />
                <div>
                  <p className="text-xs font-medium text-canvas/60">Group Size</p>
                  <p className="font-semibold">{itinerary.groupSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mountain className="text-terracotta" size={24} />
                <div>
                  <p className="text-xs font-medium text-canvas/60">Activity Level</p>
                  <p className="font-semibold">{itinerary.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="text-terracotta" size={24} />
                <div>
                  <p className="text-xs font-medium text-canvas/60">Best Season</p>
                  <p className="font-semibold">{itinerary.season}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-canvas transition-colors hover:bg-white hover:text-forest"
              >
                Request a quote <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl lg:h-[600px]">
            <img
              src={itinerary.image}
              alt={itinerary.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_400px] lg:px-10">
          <div>
            <h2 className="mb-12 font-display text-3xl text-forest sm:text-4xl">Day by day</h2>
            <DayByDay dayPlans={itinerary.dayPlans} />
          </div>

          <div className="space-y-12">
            <div className="rounded-2xl border border-line bg-white p-8">
              <h3 className="font-display text-xl text-forest">Trip Highlights</h3>
              <ul className="mt-6 space-y-4">
                {itinerary.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex gap-3 text-charcoal/80">
                    <Check className="shrink-0 text-terracotta" size={20} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-sand p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-forest">
                From
              </p>
              <p className="mt-2 font-display text-4xl text-brand">
                ${itinerary.price}
                <span className="text-lg text-forest/60"> / person</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-forest/70">
                Prices are subject to change based on seasonality, group size, and specific accommodation choices.
              </p>
              <Link
                href="/contact"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-semibold text-canvas transition-colors hover:bg-brand"
              >
                Plan this trip
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
