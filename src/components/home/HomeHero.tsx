'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Background Video with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source 
            src="https://public-assets.content-platform.envatousercontent.com/b88035ec-19c9-4da1-a14c-89c9e74bf5d8/61c3e5bf-5ec7-44b4-b8b0-22fbccbac128/b88035ec-19c9-4da1-a14c-89c9e74bf5d8/preview_540p_crf22_higher_quality.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image if video fails */}
          <img 
            src="/tours/img_main_cover.jpg" 
            alt="OceanWay Tours Background"
            className="w-full h-full object-cover opacity-50"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/75 to-black/50 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center justify-center text-center max-w-4xl py-6 sm:py-8 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
          {/* Glass Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8 shadow-lg max-w-full">
            <span className="bg-brand text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
              Bespoke
            </span>
            <span className="text-white text-xs sm:text-sm pr-2 font-medium truncate">
              Travel Beyond Expectations
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="font-viney text-white font-normal mb-6 text-[52px] sm:text-[85px] md:text-[115px] lg:text-[135px] leading-[0.9] tracking-normal drop-shadow-2xl max-w-full"
            style={{ letterSpacing: '0' }}
          >
            Travel Beyond<br />the Ordinary
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md">
            Explore extraordinary places, compare curated packages, and uncover tailor-made experiences designed around your travel style. Every journey is 100% customizable and crafted to perfection.
          </p>
          
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <Link 
              href="/itineraries"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-full font-semibold text-base sm:text-lg transition-all text-center shadow-xl group border border-white/20"
            >
              <Compass className="w-5 h-5 text-white/90" />
              Explore Tour Packages
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-base sm:text-lg transition-all text-center shadow-xl"
            >
              Request Custom Quote
            </Link>
          </div>

          {/* Value Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 border-t border-white/15 text-white/80 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Tailored & Editable</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Best Value & Verified Stays</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-brand-light font-bold">24/7</span>
              <span>Dedicated Concierge Service</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
