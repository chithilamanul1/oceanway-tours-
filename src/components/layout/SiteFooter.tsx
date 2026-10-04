import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { contactInfo, logoUrl } from '@/data/siteContent';

export default function SiteFooter() {
  return (
    <footer className="bg-forest text-mist pt-16 pb-8 w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img src={logoUrl} alt="OceanWay Tours" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-mist/80 text-sm leading-relaxed">
              Crafting unforgettable journeys with deep local knowledge, exceptional service, and a passion for authentic travel experiences.
            </p>
            <div className="flex gap-3">
              <a 
                href={contactInfo.googleBusiness} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="OceanWay Tours on Google" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Destinations Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Holidays</h4>
            <ul className="space-y-4">
              <li><Link href="/destinations/sri-lanka" className="text-mist/80 hover:text-white transition-colors">Sri Lanka Tours</Link></li>
              <li><Link href="/destinations/saudi-arabia" className="text-mist/80 hover:text-white transition-colors">Saudi Arabia Tours</Link></li>
              <li><Link href="/destinations/bahrain" className="text-mist/80 hover:text-white transition-colors">Bahrain Tours</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-mist/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/itineraries" className="text-mist/80 hover:text-white transition-colors">Holidays & Tours</Link></li>
              <li><Link href="/journal" className="text-mist/80 hover:text-white transition-colors">Travel Blog</Link></li>
              <li><Link href="/about#faq" className="text-mist/80 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-mist/80">
                <MapPin size={20} className="text-brand shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex gap-3 text-mist/80">
                <Phone size={20} className="text-brand shrink-0" />
                <a href={`tel:${contactInfo.phone.split('/')[0].trim()}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex gap-3 text-mist/80">
                <Mail size={20} className="text-brand shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
              </li>
              <li className="flex gap-3 text-mist/80 items-center">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 text-brand">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </span>
                <a 
                  href={contactInfo.googleBusiness} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Google Business Profile</span>
                  <span className="text-[11px] bg-brand text-white font-semibold px-2 py-0.5 rounded-full">5.0 ★</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mist/60 text-sm text-center md:text-left">
            &copy; 2026 OceanWay Tours. All rights reserved.<br className="md:hidden" />
            <span className="hidden md:inline"> | </span>Made by <a href="https://seranex.lk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Seranex.lk</a> with love by Chithila Manul.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-mist/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-mist/60 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-mist/60 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
