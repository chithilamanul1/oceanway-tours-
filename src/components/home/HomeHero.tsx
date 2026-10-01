'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: "Sri Lanka",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/3a91d4f3-e4c3-4c33-ab9b-1bbaadfb6556.jpg",
  },
  {
    id: 2,
    name: "Saudi Arabia",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/8cb0359e-dfc0-47ad-93d0-b1e99cf670bd.jpg",
  },
  {
    id: 3,
    name: "Bahrain",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/cb3b6cb8-ff31-40c7-b69b-f853763e43dc.jpg",
  },
  {
    id: 4,
    name: "Maldives",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/e445e8fc-0b9a-4a0e-ae29-b945ec2f8d7e.jpg",
  }
];

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://cdn.pixabay.com/video/2020/07/04/43870-435738837_large.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img 
            src="https://cdn.magicpatterns.com/patterns/generated-images/3a91d4f3-e4c3-4c33-ab9b-1bbaadfb6556.jpg" 
            alt="Mountains and Lake"
            className="w-full h-full object-cover opacity-50"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-black/10 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between gap-12 h-full py-12 md:py-0">
        {/* Left Side: Typography */}
        <div className="flex-1 max-w-2xl text-left flex flex-col items-start mt-4 md:mt-0 z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>
              <span className="text-white text-sm pr-3 font-medium">Travel Beyond Expectations</span>
            </div>

            {/* Title */}
            <h1 className="font-viney text-white font-normal mb-6 text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] leading-[0.8] tracking-normal drop-shadow-xl relative z-10" style={{ letterSpacing: '0' }}>
              Travel Beyond<br/>the Ordinary
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-lg leading-relaxed font-light drop-shadow-md">
              Explore extraordinary places, compare travel options, and uncover experiences that match your travel style. Travel smarter, discover more, and make every moment count.
            </p>
            
            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/itineraries"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all text-center shadow-xl group"
              >
                Explore Destinations
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Curved Carousel */}
        <div className="flex-1 w-full relative h-[350px] md:h-[600px] flex items-center justify-center md:justify-end overflow-visible">
          <div className="relative w-full max-w-[300px] md:max-w-none h-full flex items-center justify-center md:justify-end right-0 md:right-[50px]">
            {isClient && (
              <AnimatePresence>
                {destinations.map((dest, index) => {
                  const isActive = index === activeIndex;
                  const offset = (index - activeIndex + destinations.length) % destinations.length;
                  
                  let y = 0;
                  let x = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = 10;

                  // Define the arc positions
                  if (offset === 0) {
                    y = 0;
                    x = isMobile ? 40 : -80; // Pushed right on mobile to make space for left label
                    scale = isMobile ? 1.05 : 1.1;
                    opacity = 1;
                    zIndex = 20;
                  } else if (offset === 1) {
                    y = isMobile ? 110 : 150;
                    x = isMobile ? 80 : 0;
                    scale = isMobile ? 0.8 : 0.75;
                    opacity = 0.6;
                    zIndex = 10;
                  } else if (offset === destinations.length - 1) {
                    y = isMobile ? -110 : -150;
                    x = isMobile ? 80 : 0;
                    scale = isMobile ? 0.8 : 0.75;
                    opacity = 0.6;
                    zIndex = 10;
                  } else {
                    y = isMobile ? 180 * (offset > 1 ? 1 : -1) : 250 * (offset > 1 ? 1 : -1);
                    x = isMobile ? 120 : 100;
                    scale = 0.5;
                    opacity = 0;
                    zIndex = 0;
                  }

                  return (
                    <motion.div
                      key={dest.id}
                      className="absolute flex items-center shadow-2xl cursor-pointer"
                      animate={{
                        y,
                        x,
                        scale,
                        opacity,
                        zIndex
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 25
                      }}
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* Label placed to the left */}
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-[100%] mr-4 md:mr-6 whitespace-nowrap text-right flex flex-col items-end"
                        >
                          <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg leading-tight font-display">
                            {dest.name.split('\n')[0] || dest.name}
                          </h3>
                          {dest.name.includes('\n') && (
                            <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-md">
                              {dest.name.split('\n')[1]}
                            </p>
                          )}
                        </motion.div>
                      )}

                      {/* Image container */}
                      <div 
                        className="rounded-full overflow-hidden border-4 border-white/20 relative"
                        style={{
                          width: 'clamp(140px, 20vw, 220px)',
                          aspectRatio: '1/1',
                        }}
                      >
                        <img 
                          src={dest.image} 
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
