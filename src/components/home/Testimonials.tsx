import React from 'react';
import SectionIntro from '@/components/ui/SectionIntro';
import { testimonials } from '@/data/siteContent';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-forest relative overflow-hidden w-full max-w-full">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/10 -skew-x-12 translate-x-32 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-brand/20 text-brand text-sm font-semibold tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            What Our Travelers Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-md rounded-[28px] p-8 border border-white/20 relative">
              <Quote className="absolute top-8 right-8 text-white/10" size={48} />
              
              <div className="flex gap-1 text-[#F59E0B] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-mist/90 text-lg leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xl uppercase">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-mist/60 text-sm">{testimonial.origin} &bull; {testimonial.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
