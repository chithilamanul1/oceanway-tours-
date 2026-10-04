import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function QuoteCta() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden w-full max-w-full">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-brand rounded-[32px] overflow-hidden relative">
          <div className="absolute inset-0">
            <img 
              src="/WhatsApp%20Image%202026-09-24%20at%201.23.28%20AM%20(2).jpeg" 
              alt="Beach background" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 p-12 md:p-20 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              Ready for Your Next Great Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get in touch with our travel experts today and let us design a journey tailored perfectly to your preferences.
            </p>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-brand px-8 py-4 rounded-full font-bold text-lg hover:bg-mist transition-colors shadow-xl"
            >
              Get Your Free Quote
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
