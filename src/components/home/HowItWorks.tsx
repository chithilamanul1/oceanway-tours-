import React from 'react';
import SectionIntro from '@/components/ui/SectionIntro';
import { howItWorks } from '@/data/siteContent';

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionIntro
          eyebrow="Simple Process"
          title="How It Works"
          align="center"
        >
          Your dream holiday is just a few steps away. We make planning effortless.
        </SectionIntro>

        <div className="relative mt-16 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-line -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {howItWorks.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-sand shadow-lg flex items-center justify-center text-2xl font-bold text-brand mb-6 group-hover:scale-110 group-hover:border-brand/20 transition-all duration-300 relative">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-forest mb-3">{step.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
