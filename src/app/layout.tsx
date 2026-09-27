import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="min-h-screen bg-white font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
