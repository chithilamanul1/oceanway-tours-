import React from 'react';
import SectionIntro from '@/components/ui/SectionIntro';
import { howItWorks } from '@/data/siteContent';
import { ClipboardEdit, MessagesSquare, FileCheck2, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HowItWorks() {
  const stepIcons = [
    <ClipboardEdit key="step-1" size={32} strokeWidth={1.5} />,
    <MessagesSquare key="step-2" size={32} strokeWidth={1.5} />,
    <FileCheck2 key="step-3" size={32} strokeWidth={1.5} />,
    <ShieldCheck key="step-4" size={32} strokeWidth={1.5} />
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4 font-display">How It Works</h2>
            <p className="text-forest/70 text-lg">
              Your dream holiday is just a few steps away. We make planning effortless.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-16 max-w-6xl mx-auto px-4">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-line z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {howItWorks.map((step, index) => (
              <ScrollReveal key={index} delay={0.15 * index} direction="up" className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white shadow-[0_4px_20px_rgba(10,77,171,0.15)] flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform duration-300 relative border-[6px] border-white ring-1 ring-brand/10">
                  {stepIcons[index]}
                </div>
                {/* Small connecting line for mobile */}
                <div className="md:hidden w-0.5 h-10 bg-line my-2" />
                <h3 className="text-xl font-bold text-forest mb-4 pb-4 border-b border-line w-full">{step.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed max-w-[280px]">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
