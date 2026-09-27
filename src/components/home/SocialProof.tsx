'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { stats } from '@/data/siteContent';
import ReviewFilter from '@/components/ui/ReviewFilter';

export default function SocialProof() {
  return (
    <section className="bg-white border-y border-line py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
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
            <div className="w-12 h-12 bg-[#00AF87] rounded-full flex items-center justify-center text-white">
              <span className="font-bold font-serif text-2xl">t</span>
            </div>
            <div>
              <div className="flex gap-1 text-[#00AF87] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-bold text-forest">4.8/5 on TripAdvisor</p>
            </div>
          </div>

          <div className="w-px h-12 bg-line hidden lg:block" />

          <div className="flex items-center gap-4 hidden lg:flex cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.open('https://share.google/S8Qqptam62GHSUq4m', '_blank')}>
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex gap-1 text-[#F59E0B] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-bold text-forest">4.9/5 Google Reviews</p>
            </div>
          </div>

          <div className="w-px h-12 bg-line hidden xl:block" />

          <div className="hidden xl:block">
            <ReviewFilter />
          </div>

        </div>
      </div>
    </section>
  );
}
