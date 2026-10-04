import React from 'react';
import SectionIntro from '@/components/ui/SectionIntro';
import { services } from '@/data/siteContent';

export default function ServicesGrid() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden w-full max-w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionIntro
          eyebrow="What We Offer"
          title="Our Services"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className="group rounded-2xl overflow-hidden border border-line hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-forest mb-3">{service.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
          
          {services.slice(3, 5).map((service, index) => (
            <div key={index + 3} className="group rounded-2xl overflow-hidden border border-line hover:shadow-xl transition-all duration-300 lg:col-span-1.5 md:col-span-1">
              <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-forest mb-3">{service.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
