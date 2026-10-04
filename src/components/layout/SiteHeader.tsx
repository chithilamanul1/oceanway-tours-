'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, Menu, X, Facebook, Instagram, Linkedin } from 'lucide-react';
import { contactInfo, logoUrl } from '@/data/siteContent';

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Holidays & Tours', href: '/itineraries' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About us', href: '/about' },
    { label: 'Travel Blog', href: '/journal' },
    { label: 'FAQ', href: '/about#faq' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <div className="bg-brand text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-mint transition-colors">
              <Mail size={16} />
              {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone.split('/')[0].trim()}`} className="flex items-center gap-2 hover:text-mint transition-colors">
              <Phone size={16} />
              {contactInfo.phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={contactInfo.googleBusiness} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Google Business Profile" 
              className="hover:text-mint transition-colors flex items-center gap-1 text-xs bg-white/15 px-2.5 py-0.5 rounded-full font-medium"
            >
              <span>Google 5.0 ★</span>
            </a>
            <a 
              href={contactInfo.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="OceanWay Tours on Facebook" 
              className="hover:text-mint transition-colors p-1"
            >
              <Facebook size={15} />
            </a>
            <a 
              href={contactInfo.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="OceanWay Tours on Instagram" 
              className="hover:text-mint transition-colors p-1"
            >
              <Instagram size={15} />
            </a>
            <a 
              href={contactInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="OceanWay Tours on LinkedIn" 
              className="hover:text-mint transition-colors p-1"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <img src={logoUrl} alt="OceanWay Tours" className="h-16 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href ? 'text-brand' : 'text-forest hover:text-brand'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/contact" className="font-medium text-forest hover:text-brand transition-colors">
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="bg-brand text-white px-6 py-2.5 rounded-full font-medium hover:bg-forest transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-forest p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-line">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium ${pathname === link.href ? 'text-brand' : 'text-forest'}`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-line" />
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-forest"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand text-white text-center px-6 py-3 rounded-full font-medium"
            >
              Get a Quote
            </Link>

            <div className="pt-2 flex items-center justify-center gap-5 text-forest/70 border-t border-line">
              <a 
                href={contactInfo.googleBusiness} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand transition-colors text-xs font-semibold flex items-center gap-1 bg-sand px-2.5 py-1 rounded-full"
              >
                <span>Google 5.0 ★</span>
              </a>
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors p-1.5 rounded-full bg-sand">
                <Facebook size={16} />
              </a>
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors p-1.5 rounded-full bg-sand">
                <Instagram size={16} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors p-1.5 rounded-full bg-sand">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
