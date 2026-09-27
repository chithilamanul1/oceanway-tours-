import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users, Sun, ArrowRight } from 'lucide-react';
import { Itinerary } from '@/types/content';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-line overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img 
          src={itinerary.image} 
          alt={itinerary.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5 text-forest">
          <Clock size={14} className="text-brand" />
          {itinerary.duration} Days
        </div>
        <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {itinerary.tier}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-brand text-sm font-semibold uppercase tracking-wider mb-2">
          <MapPin size={14} />
          {itinerary.destinationName}
        </div>
        
        <h3 className="text-xl font-bold text-forest mb-3 line-clamp-2 hover:text-brand transition-colors">
          <Link href={`/itineraries/${itinerary.id}`}>
            {itinerary.title}
          </Link>
        </h3>
        
        <p className="text-forest/70 text-sm mb-6 line-clamp-2">
          {itinerary.summary}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-line mt-auto text-sm text-forest/80">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-brand/70" />
            {itinerary.groupSize}
          </div>
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-brand/70" />
            {itinerary.season}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="block text-xs text-forest/60 uppercase tracking-wider mb-1">From</span>
            <span className="text-xl font-bold text-forest">${itinerary.price}</span>
          </div>
          <Link 
            href={`/itineraries/${itinerary.id}`}
            className="flex items-center gap-2 bg-sand text-brand px-5 py-2.5 rounded-full font-medium hover:bg-brand hover:text-white transition-colors"
          >
            View Tour
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
