import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, Target } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionIntro from '@/components/ui/SectionIntro';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChoose from '@/components/home/WhyChoose';
import QuoteCta from '@/components/home/QuoteCta';
import FaqList from '@/components/ui/FaqList';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about OceanWay Tours — crafting tailor-made holidays to Sri Lanka, Saudi Arabia, and Bahrain.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OceanWay Tours"
        title="Your Journey, Our Passion"
        description="Welcome to OceanWay Tours, a premier travel company dedicated to transforming your vacation dreams into reality. Based in the heart of Sri Lanka, we are a reputable travel agency that cares deeply about every traveller's experience."
        image="https://cdn.magicpatterns.com/patterns/generated-images/c98694b3-443a-4dee-b9f7-c09978bdfccc.jpg"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionIntro title="Our Story" align="left">
            <p>
              OceanWay Tours was founded with a simple goal: to make world-class travel accessible,
              safe, and entirely stress-free. We specialize in Sri Lanka, Saudi Arabia, and Bahrain
              — three extraordinary destinations where our local knowledge runs deep.
            </p>
            <p className="mt-4">
              Today, we are proud to be recognised among the top travel agencies in Sri Lanka and a
              trusted partner for regional tours and travels.
            </p>
          </SectionIntro>
          <div className="grid gap-6">
            <article className="rounded-2xl bg-mist p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                <Compass size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">Our Vision</h3>
              <p className="mt-2 text-sm leading-7 text-charcoal/80">
                To be the most trusted tour operator connecting people to breathtaking destinations
                across Sri Lanka, Saudi Arabia, and Bahrain.
              </p>
            </article>
            <article className="rounded-2xl bg-mint p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                <Target size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">Our Mission</h3>
              <p className="mt-2 text-sm leading-7 text-charcoal/80">
                To provide high-quality, affordable, and customised tour packages with transparent
                pricing, 24/7 support, and authentic local experiences.
              </p>
            </article>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <WhyChoose />

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[28px] bg-cream px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl text-ink sm:text-4xl">
            <span className="font-bold">Our</span> Commitment to You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-charcoal/80">
            At OceanWay Tours, you are never just a booking number. We build lasting relationships
            and become your lifelong vacation planning partner.
          </p>
        </div>
      </section>

      <section id="faq" className="scroll-mt-32 px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro title="Frequently Asked Questions" align="left">
            Everything you need to know before you book your next holiday.
          </SectionIntro>
          <FaqList />
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
