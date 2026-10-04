'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { stats, contactInfo } from '@/data/siteContent';
import ReviewFilter from '@/components/ui/ReviewFilter';

export default function SocialProof() {
  return (
    <section className="bg-white border-y border-line py-6 sm:py-8 w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16">
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              <img src="/WhatsApp%20Image%202026-09-24%20at%201.23.26%20AM.jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="/WhatsApp%20Image%202026-09-24%20at%201.23.27%20AM.jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="/WhatsApp%20Image%202026-09-24%20at%201.23.28%20AM%20(1).jpeg" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              <div className="w-12 h-12 rounded-full border-2 border-white bg-sand flex items-center justify-center font-bold text-brand text-xs">
                10k+
              </div>
            </div>
            <div>
              <p className="font-bold text-forest">Happy Travelers</p>
              <p className="text-sm text-forest/60">Worldwide</p>
            </div>
          </div>

          <div className="w-px h-12 bg-line hidden md:block" />

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-1.5 overflow-hidden border border-line/50">
              <img src="/tripadvisor-logo.png" alt="TripAdvisor" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex gap-1 text-[#00AF87] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-bold text-forest">5.0/5 on TripAdvisor</p>
            </div>
          </div>

          <div className="w-px h-12 bg-line hidden sm:block" />

          <a 
            href={contactInfo.googleReviewsUrl || 'https://share.google/S6DsIzcQvoLdH3rYU'}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-2 overflow-hidden border border-line/50">
              <img src="/google-logo.png" alt="Google" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex gap-1 text-[#F59E0B] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-bold text-forest hover:text-brand transition-colors">5.0/5 Google Reviews</p>
            </div>
          </a>

          <div className="w-px h-12 bg-line hidden xl:block" />

          <div className="hidden xl:block">
            <ReviewFilter />
          </div>

        </div>
      </div>
    </section>
  );
}
