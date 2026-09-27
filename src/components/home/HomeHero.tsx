'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const videos = [
  "https://public-assets.content-platform.envatousercontent.com/b88035ec-19c9-4da1-a14c-89c9e74bf5d8/61c3e5bf-5ec7-44b4-b8b0-22fbccbac128/b88035ec-19c9-4da1-a14c-89c9e74bf5d8/preview_540p_crf22_higher_quality.mp4",
  "https://public-assets.content-platform.envatousercontent.com/086ca23c-2d18-49c1-ab74-34e6add17918/bfa660d7-e06e-4b59-bc3f-9f3fd9bb9a04/086ca23c-2d18-49c1-ab74-34e6add17918/preview_540p_crf22_higher_quality.mp4",
  "https://public-assets.content-platform.envatousercontent.com/8015c782-c13c-4f3e-b150-89191e4358f8/45f8e4da-de03-4b67-be13-a42c8a769106/8015c782-c13c-4f3e-b150-89191e4358f8/preview_540p_crf22_higher_quality.mp4",
  "https://public-assets.content-platform.envatousercontent.com/d7885d7d-5d21-4c7e-9861-3dc941b10158/43f5733b-3ced-45a4-822d-5d2310daefb8/d7885d7d-5d21-4c7e-9861-3dc941b10158/preview_540p_crf22_higher_quality.mp4",
  "https://public-assets.content-platform.envatousercontent.com/1d681e18-4d79-4b13-a8bf-c0d465990b73/f2623924-50d2-4bf2-8c65-8ba2e3b462d7/1d681e18-4d79-4b13-a8bf-c0d465990b73/preview_540p_crf22_higher_quality.mp4",
  "https://public-assets.content-platform.envatousercontent.com/798add73-8ad4-40f3-8da7-e0270604dc2a/97f634d7-4964-4479-9dea-6c860667d7c4/798add73-8ad4-40f3-8da7-e0270604dc2a/preview_540p_crf22_higher_quality.mp4"
];

export default function HomeHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentVideoIndex(nextVideoIndex);
        setNextVideoIndex((nextVideoIndex + 1) % videos.length);
        setIsFading(false);
      }, 1000); // Crossfade duration
    }, 6000); // Time per video

    return () => clearInterval(interval);
  }, [nextVideoIndex]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Videos */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Main Video */}
        <video 
          key={`vid-main-${currentVideoIndex}`}
          src={videos[currentVideoIndex]}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Next Video for crossfade */}
        <video 
          key={`vid-next-${nextVideoIndex}`}
          src={videos[nextVideoIndex]}
          autoPlay 
          muted 
          loop 
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-transparent z-20" />
      </div>

      <div className="container mx-auto px-6 relative z-30 flex justify-center text-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <span className="inline-block py-1.5 px-5 rounded-full border border-white/30 text-white font-semibold tracking-wider uppercase mb-6 shadow-lg text-xs md:text-sm bg-white/5 backdrop-blur-sm">
            Bespoke Travel Experiences
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl font-display">
            <span className="text-brand font-viney font-normal capitalize block mb-2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-normal" style={{ letterSpacing: '0' }}>Discover</span>
            the World with OceanWay Tours
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md mx-auto">
            Crafting unforgettable journeys with deep local knowledge, exceptional service, and a passion for authentic travel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-brand transition-colors text-center shadow-xl flex items-center justify-center gap-2"
            >
              Plan My Trip
            </Link>
            <Link 
              href="/itineraries"
              className="w-full sm:w-auto bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-forest transition-colors text-center shadow-xl"
            >
              View Tour Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
