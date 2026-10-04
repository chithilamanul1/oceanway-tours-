import HomeHero from '@/components/home/HomeHero';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChoose from '@/components/home/WhyChoose';
import ServicesGrid from '@/components/home/ServicesGrid';
import Testimonials from '@/components/home/Testimonials';
import QuoteCta from '@/components/home/QuoteCta';
import SocialProof from '@/components/home/SocialProof';
import TourTiers from '@/components/home/TourTiers';
import SectionIntro from '@/components/ui/SectionIntro';
import ItineraryCard from '@/components/cards/ItineraryCard';
import DestinationCard from '@/components/cards/DestinationCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { itinerariesSeed } from '@/data/itineraries';
import { destinationsSeed } from '@/data/destinations';
import { stats } from '@/data/siteContent';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { connectDB } from '@/lib/mongodb';
import { Itinerary as ItineraryModel, Destination as DestinationModel } from '@/lib/models';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let itineraries: any[] = [];
  let destinations: any[] = [];

  try {
    await connectDB();
    const dbItineraries = await ItineraryModel.find().lean();
    const dbDestinations = await DestinationModel.find().lean();
    
    if (dbItineraries.length > 0) {
      itineraries = JSON.parse(JSON.stringify(dbItineraries));
    }
    if (dbDestinations.length > 0) {
      destinations = JSON.parse(JSON.stringify(dbDestinations));
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB, using seed data.', error);
  }

  const { extraItineraries } = await import('@/data/extraItineraries');
  const extra = JSON.parse(JSON.stringify(extraItineraries));
  const existingIds = new Set(itineraries.map((i: any) => i.id));
  const toAdd = extra.filter((i: any) => !existingIds.has(i.id));
  itineraries = [...itineraries, ...toAdd] as any;

  // Filter out any legacy dummy tours so ONLY the customized tours are shown
  itineraries = itineraries.filter((i: any) => !i.id.startsWith('itin-'));
  if (itineraries.length === 0) {
    itineraries = extra;
  }

  if (destinations.length === 0) {
    destinations = destinationsSeed as any;
  }

  return (
    <>
      <HomeHero />
      <SocialProof />
      <HowItWorks />

      {/* Welcome Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 overflow-hidden">
        <ScrollReveal>
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <SectionIntro title="Welcome to OceanWay Tours" align="left">
              <p>
                A top-rated travel agency dedicated to making your travel dreams a reality. Whether you
                are searching for the best travel agency for a Sri Lanka getaway, a Saudi Arabia
                heritage tour, or a Bahrain city break, our expert travel consultants are here to
                help—from budget holiday packages to luxury private travel.
              </p>
            </SectionIntro>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-l-2 border-brand pl-6">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={0.1 * i} direction="left">
                  <dt className="text-xs text-charcoal/70">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-ink">{stat.value}</dd>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </section>

      {/* Tour Packages */}
      <section className="px-4 pb-20 sm:px-6 lg:px-10 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="up">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionIntro title="Best-Selling Trip Packages" align="left">
                Vacation packages for every travel style—from budget-friendly getaways to luxury
                tailor-made experiences.
              </SectionIntro>
              <Link
                href="/itineraries"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                All Packages <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {itineraries.slice(0, 4).map((itinerary, i) => (
              <ScrollReveal key={itinerary.id} delay={0.1 * i}>
                <ItineraryCard itinerary={itinerary} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TourTiers />
      
      <ScrollReveal direction="up">
        <WhyChoose />
      </ScrollReveal>

      {/* Top Destinations */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="up">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionIntro title="Top Destinations" align="left">
                Explore Sri Lanka, Saudi Arabia, and Bahrain with tailor-made holidays, guided group
                tours, and incredible weekend getaways.
              </SectionIntro>
              <Link
                href="/destinations"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                All Destinations <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((destination, i) => (
              <ScrollReveal key={destination.id} delay={0.1 * i}>
                <DestinationCard destination={destination} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal direction="up">
        <ServicesGrid />
      </ScrollReveal>
      
      <ScrollReveal direction="up">
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="none">
        <QuoteCta />
      </ScrollReveal>
    </>
  );
}
