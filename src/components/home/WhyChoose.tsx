import React from 'react';
import SectionIntro from '@/components/ui/SectionIntro';
import { CheckCircle2 } from 'lucide-react';
import { whyChoose } from '@/data/siteContent';

export default function WhyChoose() {
  return (
    <section className="py-24 bg-sand">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionIntro
              eyebrow="The OceanWay Difference"
              title="Why Choose Us"
              align="left"
            >
              We don't just sell tours; we craft experiences that resonate with your soul. Here is why thousands of travelers trust us.
            </SectionIntro>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {whyChoose.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 text-brand">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest mb-2">{item.title}</h3>
                    <p className="text-forest/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand rounded-[28px] translate-x-6 translate-y-6" />
            <img 
              src="https://images.unsplash.com/photo-1533587851505-d119e13bf0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Travelers enjoying their time" 
              className="relative z-10 rounded-[28px] w-full h-[500px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
