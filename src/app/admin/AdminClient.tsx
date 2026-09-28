'use client';

import { useState } from 'react';
import { LayoutDashboard, Map, FileText, Image, Mail, LogOut, Menu, X } from 'lucide-react';
import ItinerariesManager from '@/components/admin/ItinerariesManager';
import EnquiriesViewer from '@/components/admin/EnquiriesViewer';
import DestinationsManager from '@/components/admin/DestinationsManager';
import BlogManager from '@/components/admin/BlogManager';
import MediaLibrary from '@/components/admin/MediaLibrary';

const logoUrl = '/logo.png';

type Tab = 'dashboard' | 'destinations' | 'itineraries' | 'blog' | 'media' | 'enquiries';

interface AdminClientProps {
  initialStats: {
    destinations: number;
    itineraries: number;
    posts: number;
    enquiries: number;
  };
}

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, description: 'Overview & stats' },
  { id: 'destinations', label: 'Destinations', icon: <Map size={18} />, description: 'Manage destination guides' },
  { id: 'itineraries', label: 'Tour Packages', icon: <FileText size={18} />, description: 'Build & edit itineraries' },
  { id: 'blog', label: 'Journal / Blog', icon: <FileText size={18} />, description: 'Publish articles' },
  { id: 'media', label: 'Media Library', icon: <Image size={18} />, description: 'Images & gallery' },
  { id: 'enquiries', label: 'CRM / Enquiries', icon: <Mail size={18} />, description: 'Sales pipeline' },
];

export function AdminClient({ initialStats }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  };

  const activeItem = NAV_ITEMS.find(n => n.id === activeTab);

  return (
    <main className="flex min-h-screen w-full bg-[#f8f9fb]">
      {/* Sidebar */}
      <aside className={`
        w-64 bg-[#0a1628] text-white flex flex-col
        fixed md:relative z-30 inset-y-0 left-0
        transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-300 ease-in-out
        shrink-0
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <img src={logoUrl} alt="Oceanway Tours" className="h-8 w-auto brightness-0 invert" />
            <p className="mt-1.5 text-[10px] text-white/40 font-semibold uppercase tracking-widest">Admin CMS</p>
          </div>
          <button className="md:hidden text-white/60" onClick={() => setMobileMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${activeTab === item.id
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'}`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-white/50'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-line px-4 sm:px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            className="md:hidden p-2 text-charcoal hover:bg-mist rounded-lg"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-semibold text-forest text-base">{activeItem?.label}</h1>
            <p className="text-xs text-charcoal/60">{activeItem?.description}</p>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl">
              <div className="mb-8">
                <h2 className="text-2xl font-display text-forest mb-1">Good day, OceanWay Team 👋</h2>
                <p className="text-charcoal/60 text-sm">Here's your live platform overview.</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Destinations', value: initialStats.destinations, color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
                  { label: 'Tour Packages', value: initialStats.itineraries, color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
                  { label: 'Journal Posts', value: initialStats.posts, color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700' },
                  { label: 'Total Enquiries', value: initialStats.enquiries, color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
                ].map(stat => (
                  <div key={stat.label} className={`p-5 rounded-xl border ${stat.color}`}>
                    <p className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                    <p className="text-sm text-charcoal/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-line rounded-xl p-5">
                  <h3 className="font-semibold text-forest mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: '+ Add New Tour Package', tab: 'itineraries' as Tab },
                      { label: '+ Add New Destination', tab: 'destinations' as Tab },
                      { label: '+ Write Blog Post', tab: 'blog' as Tab },
                      { label: '+ Upload to Media Library', tab: 'media' as Tab },
                    ].map(action => (
                      <button
                        key={action.label}
                        onClick={() => setActiveTab(action.tab)}
                        className="w-full text-left text-sm px-3 py-2.5 rounded-lg border border-line hover:border-brand hover:text-brand transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-line rounded-xl p-5">
                  <h3 className="font-semibold text-forest mb-3">CMS Modules</h3>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>✅ <strong>Tour Package Builder</strong> — Full CRUD with day plans, pricing & SEO</p>
                    <p>✅ <strong>Destination Guides</strong> — Gallery, descriptions & SEO fields</p>
                    <p>✅ <strong>Blog Publisher</strong> — Multi-paragraph articles with SEO</p>
                    <p>✅ <strong>Media Library</strong> — Store & tag reusable image URLs</p>
                    <p>✅ <strong>Sales CRM</strong> — Kanban pipeline for enquiries</p>
                    <p>✅ <strong>JWT Security</strong> — Signed cookies protect all API writes</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'destinations' && <DestinationsManager />}
          {activeTab === 'itineraries' && <ItinerariesManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'media' && <MediaLibrary />}
          {activeTab === 'enquiries' && <EnquiriesViewer />}
        </div>
      </div>
    </main>
  );
}
