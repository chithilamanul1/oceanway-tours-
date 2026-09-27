'use client';

import { useState } from 'react';
import { LayoutDashboard, Map, Mail } from 'lucide-react';
import ItinerariesManager from '@/components/admin/ItinerariesManager';
import EnquiriesViewer from '@/components/admin/EnquiriesViewer';
import DestinationsManager from '@/components/admin/DestinationsManager';
import BlogManager from '@/components/admin/BlogManager';

const logoUrl = '/logo.png'; 

interface AdminClientProps {
  initialStats: {
    destinations: number;
    itineraries: number;
    posts: number;
    enquiries: number;
  };
}

export function AdminClient({ initialStats }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'destinations' | 'itineraries' | 'blog' | 'enquiries'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen w-full bg-mist relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-forest text-white p-4 absolute top-0 left-0 right-0 z-20">
        <img src={logoUrl} alt="Oceanway Tours" className="h-8 w-auto brightness-0 invert" />
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white">
          <LayoutDashboard size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-forest text-white flex flex-col fixed md:relative z-10 inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 border-b border-white/10 hidden md:block">
          <img src={logoUrl} alt="Oceanway Tours" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-2 text-xs text-white/50 font-semibold uppercase tracking-wider">Admin Workspace</p>
        </div>
        <div className="p-6 border-b border-white/10 md:hidden mt-12">
          <p className="text-xs text-white/50 font-semibold uppercase tracking-wider">Admin Workspace</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('destinations'); setMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'destinations' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Map size={18} /> Destinations
          </button>
          <button 
            onClick={() => { setActiveTab('itineraries'); setMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'itineraries' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Map size={18} /> Tour Packages
          </button>
          <button 
            onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'blog' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Map size={18} /> Journal (Blog)
          </button>
          <button 
            onClick={() => { setActiveTab('enquiries'); setMobileMenuOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'enquiries' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Mail size={18} /> CRM / Enquiries
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full text-sm font-semibold text-white/70 hover:text-white text-left px-4 py-2"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 sm:p-8">
          {activeTab === 'dashboard' && (
            <section className="w-full max-w-4xl">
              <h1 className="font-display text-3xl text-forest mb-2">Travel Desk</h1>
              <p className="text-sm text-charcoal/70 mb-8">
                Welcome to the OceanWay Tours admin panel. Select a module from the sidebar to start managing your platform.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                  <p className="font-display text-4xl text-forest">{initialStats.destinations}</p>
                  <p className="mt-1 text-sm text-charcoal/65">Destinations</p>
                </div>
                <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                  <p className="font-display text-4xl text-forest">{initialStats.itineraries}</p>
                  <p className="mt-1 text-sm text-charcoal/65">Tour Packages</p>
                </div>
                <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                  <p className="font-display text-4xl text-forest">{initialStats.posts}</p>
                  <p className="mt-1 text-sm text-charcoal/65">Journal Entries</p>
                </div>
                <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                  <p className="font-display text-4xl text-forest">{initialStats.enquiries}</p>
                  <p className="mt-1 text-sm text-charcoal/65">Total Enquiries</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'destinations' && <DestinationsManager />}
          {activeTab === 'itineraries' && <ItinerariesManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'enquiries' && <EnquiriesViewer />}
        </div>
      </div>
    </main>
  );
}
