import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import QuoteFunnel from '@/components/contact/QuoteFunnel';
import { contactInfo } from '@/data/siteContent';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Start planning your next adventure. Get a free consultation and 3 personalised travel quotes.',
};

const details = [
  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Office', value: contactInfo.address },
  { icon: Clock, label: 'Support', value: contactInfo.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Start Planning Your Next Adventure Today"
        description="Ready to book a tour package? Our team is ready to assist with a free consultation and 3 personalised quotes."
      />
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="h-fit rounded-[28px] bg-mint p-8">
            <h2 className="text-2xl text-ink">
              <span className="font-bold">Get</span> in Touch
            </h2>
            <ul className="mt-6 space-y-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-charcoal/70">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-ink hover:text-brand">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
          <div className="rounded-[28px] border border-line p-6 sm:p-10">
            <QuoteFunnel />
          </div>
        </div>
      </section>
    </>
  );
}
