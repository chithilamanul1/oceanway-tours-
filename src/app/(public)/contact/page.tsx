import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import QuoteFunnel from '@/components/contact/QuoteFunnel';
import { contactInfo } from '@/data/siteContent';
import { Clock, Mail, MapPin, Phone, Star, Facebook, Instagram, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Start planning your next adventure. Get a free consultation and 3 personalised travel quotes.',
};

const details = [
  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Office', value: contactInfo.address },
  { icon: Clock, label: 'Support', value: contactInfo.hours },
  { icon: Star, label: 'Google Business Profile', value: 'OceanWay Tours (5.0 ★)', href: contactInfo.googleBusiness, external: true },
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
              {details.map(({ icon: Icon, label, value, href, external }: any) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-charcoal/70">{label}</p>
                    {href ? (
                      <a 
                        href={href} 
                        target={external ? '_blank' : undefined} 
                        rel={external ? 'noopener noreferrer' : undefined} 
                        className="text-sm font-medium text-ink hover:text-brand"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-line/50 space-y-3">
              <a
                href={contactInfo.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center p-1.5 border border-line/40 shrink-0">
                    <img src="/tripadvisor-logo.png" alt="TripAdvisor" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-charcoal/70">Verified on TripAdvisor</p>
                    <p className="text-sm font-bold text-forest group-hover:text-[#00AF87] transition-colors">5.0 ★ Reviews</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#00AF87] bg-[#00AF87]/10 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
                  Profile ↗
                </span>
              </a>

              <a
                href={contactInfo.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center p-2 border border-line/40 shrink-0">
                    <img src="/google-logo.png" alt="Google" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-charcoal/70">Verified on Google</p>
                    <p className="text-sm font-bold text-forest group-hover:text-brand transition-colors">5.0 ★ Google Reviews</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand bg-brand/10 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
                  Profile ↗
                </span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-line/40">
              <p className="text-xs font-semibold text-charcoal/70 mb-3 uppercase tracking-wider">Social Channels</p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white hover:bg-brand hover:text-white rounded-xl border border-line text-xs font-semibold text-forest transition-colors shadow-sm"
                >
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white hover:bg-brand hover:text-white rounded-xl border border-line text-xs font-semibold text-forest transition-colors shadow-sm"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white hover:bg-brand hover:text-white rounded-xl border border-line text-xs font-semibold text-forest transition-colors shadow-sm"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </aside>
          <div className="rounded-[28px] border border-line p-6 sm:p-10">
            <QuoteFunnel />
          </div>
        </div>
      </section>
    </>
  );
}
