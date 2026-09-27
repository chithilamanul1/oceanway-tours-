import type { Metadata } from 'next';
import { Poppins, Great_Vibes } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-viney',
});

export const metadata: Metadata = {
  title: {
    default: 'OceanWay Tours — Tailor-Made Holidays | Sri Lanka · Saudi Arabia · Bahrain',
    template: '%s | OceanWay Tours',
  },
  description:
    'Your trusted travel partner for tailor-made holidays, small group tours, and fixed holiday getaways across Sri Lanka, Saudi Arabia, and Bahrain. Expert local guides, 24/7 support.',
  keywords: [
    'travel agency',
    'Sri Lanka tours',
    'Saudi Arabia tours',
    'Bahrain tours',
    'tailor-made holidays',
    'holiday packages',
    'tour operator',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${greatVibes.variable}`}>
      <body className="min-h-screen bg-white font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
