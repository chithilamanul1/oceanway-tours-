import React from 'react';
import Link from 'next/link';
import SectionIntro from '@/components/ui/SectionIntro';
import { Compass, Users, CalendarDays, Check } from 'lucide-react';
import { tourTiers } from '@/types/content';

export default function TourTiers() {
  const tiers = [
    {
      name: 'Tailor-Made',
      icon: <Compass size={32} />,
      description: 'Fully customized journeys designed exactly to your preferences and pace.',
      features: ['Private vehicle & chauffeur', 'Handpicked accommodations', 'Flexible daily schedule', 'Exclusive experiences'],
      color: 'bg-brand'
    },
    {
      name: 'Small Group',
      icon: <Users size={32} />,
      description: 'Shared experiences with like-minded travelers in groups of 8-15.',
      features: ['Expert group guide', 'Fixed departure dates', 'Curated social activities', 'Great value'],
      color: 'bg-[#10B981]' // Mint-ish
    },
    {
      name: 'Fixed Getaway',
      icon: <CalendarDays size={32} />,
      description: 'Ready-to-book short breaks and weekend escapes for instant travel.',
      features: ['3-5 day itineraries', 'All-inclusive packages', 'Instant confirmation', 'Hassle-free planning'],
      color: 'bg-[#F59E0B]' // Amber
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionIntro
          eyebrow="Travel Styles"
          title="Ways to Travel With Us"
        >
          Whether you want ultimate flexibility, shared adventures, or a quick escape.
        </SectionIntro>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {tiers.map((tier, index) => (
            <div key={index} className="bg-sand rounded-[28px] p-8 border border-line hover:shadow-xl transition-shadow relative overflow-hidden flex flex-col h-full">
              <div className={`absolute top-0 right-0 w-32 h-32 ${tier.color} opacity-10 rounded-bl-full`} />
              
              <div className={`w-16 h-16 rounded-2xl ${tier.color} text-white flex items-center justify-center mb-6 shadow-md`}>
                {tier.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-forest mb-4 font-display">{tier.name}</h3>
              <p className="text-forest/70 mb-8 flex-grow">{tier.description}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-forest font-medium text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={`/itineraries?tier=${tier.name}`}
                className="block w-full py-3 px-6 bg-white border border-line rounded-full text-center font-bold text-forest hover:border-brand hover:text-brand transition-colors mt-auto"
              >
                View Tours
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
