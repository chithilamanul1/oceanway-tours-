import React from 'react';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2874&q=80" 
          alt="Beautiful landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold tracking-wider uppercase mb-6 shadow-lg text-sm">
            Bespoke Travel Experiences
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display leading-tight mb-6">
            <span className="text-brand block">Discover the World</span>
            with OceanWay Tours
          </h1>
          <p className="text-xl md:text-2xl text-mist/90 mb-10 max-w-2xl leading-relaxed font-light">
            Crafting unforgettable journeys with deep local knowledge, exceptional service, and a passion for authentic travel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact"
              className="bg-brand text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-brand transition-colors text-center shadow-xl flex items-center justify-center gap-2"
            >
              Plan My Trip
            </Link>
            <Link 
              href="/itineraries"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-forest transition-colors text-center"
            >
              View Tour Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
