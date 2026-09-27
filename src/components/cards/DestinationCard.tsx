import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Destination } from '@/types/content';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link 
      href={`/destinations/${destination.id}`}
      className="group block rounded-[28px] overflow-hidden relative aspect-[4/5] shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-forest/20 group-hover:bg-forest/10 transition-colors z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent z-10" />
      
      <img 
        src={destination.image} 
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      
      <div className="absolute bottom-0 left-0 w-full p-8 z-20">
        <div className="flex items-center gap-2 text-brand font-semibold mb-2 bg-white/90 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-sm">
          <MapPin size={14} />
          {destination.region}
        </div>
        <h3 className="text-3xl font-bold text-white font-display mb-2">{destination.name}</h3>
        <p className="text-mist/90 mb-4">{destination.tagline}</p>
        
        <div className="flex items-center text-white font-medium gap-2 group-hover:gap-4 transition-all">
          Explore Destination
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
