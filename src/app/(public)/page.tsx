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
import { itinerariesSeed } from '@/data/itineraries';
import { destinationsSeed } from '@/data/destinations';
import { stats } from '@/data/siteContent';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const itineraries = itinerariesSeed;
  const destinations = destinationsSeed;

  return (
    <>
      <HomeHero />
      <SocialProof />
      <HowItWorks />

      {/* Welcome Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
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
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-charcoal/70">{stat.label}</dt>
                <dd className="text-2xl font-bold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {itineraries.slice(0, 4).map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </section>

      <TourTiers />
      <WhyChoose />

      {/* Top Destinations */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <ServicesGrid />
      <Testimonials />
      <QuoteCta />
    </>
  );
}
