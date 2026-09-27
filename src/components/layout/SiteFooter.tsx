import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { contactInfo, logoUrl } from '@/data/siteContent';

export default function SiteFooter() {
  return (
    <footer className="bg-forest text-mist pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img src={logoUrl} alt="OceanWay Tours" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-mist/80 text-sm leading-relaxed">
              Crafting unforgettable journeys with deep local knowledge, exceptional service, and a passion for authentic travel experiences.
            </p>
            <div className="flex gap-4">
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
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-mist/60 text-sm">
            &copy; 2026 OceanWay Tours. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-mist/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-mist/60 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="text-mist/60 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
