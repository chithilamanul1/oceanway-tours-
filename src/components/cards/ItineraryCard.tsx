import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users, Sun, ArrowRight } from 'lucide-react';
import { Itinerary } from '@/types/content';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-line overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group w-full max-w-full">
      <div className="relative aspect-[3/2] overflow-hidden w-full">
        <img 
          src={itinerary.image} 
          alt={itinerary.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-forest shadow-sm">
          <Clock size={13} className="text-brand shrink-0" />
          <span>{itinerary.duration} Days</span>
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-brand text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
          {itinerary.tier}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 flex flex-col flex-grow w-full">
        <div className="flex items-center gap-1.5 text-brand text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{itinerary.destinationName}</span>
        </div>
        
        <h3 className="text-base sm:text-xl font-bold text-forest mb-2 sm:mb-3 line-clamp-2 hover:text-brand transition-colors leading-snug">
          <Link href={`/itineraries/${itinerary.id}`}>
            {itinerary.title}
          </Link>
        </h3>
        
        <p className="text-forest/70 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
          {itinerary.summary}
        </p>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-line mt-auto text-xs sm:text-sm text-forest/80">
          <div className="flex items-center gap-1.5 truncate">
            <Users size={14} className="text-brand/70 shrink-0" />
            <span className="truncate">{itinerary.groupSize}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Sun size={14} className="text-brand/70 shrink-0" />
            <span className="truncate">{itinerary.season}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="shrink-0">
            <span className="block text-[10px] sm:text-xs text-forest/60 uppercase tracking-wider">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-xl font-bold text-forest">${itinerary.price}</span>
              <span className="text-[11px] sm:text-xs text-forest/60 font-medium">/ person</span>
            </div>
          </div>
          <Link 
            href={`/itineraries/${itinerary.id}`}
            className="flex items-center gap-1.5 sm:gap-2 bg-sand text-brand px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-brand hover:text-white transition-colors shrink-0"
          >
            <span>View Tour</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
