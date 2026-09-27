'use client';

import { FormEvent, useState } from 'react';
import { LockKeyholeIcon, LogInIcon, LayoutDashboard, Map, Mail } from 'lucide-react';
import ItinerariesManager from '@/components/admin/ItinerariesManager';
import EnquiriesViewer from '@/components/admin/EnquiriesViewer';

const DEMO_PASSWORD = 'oceanway';
const logoUrl = '/logo.png'; // using updated local logo

export function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'itineraries' | 'enquiries'>('dashboard');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('That password is not quite right.');
    }
  }

  if (isAuthenticated) {
    return (
      <main className="flex min-h-screen w-full bg-mist">
        {/* Sidebar */}
        <aside className="w-64 bg-forest text-white flex flex-col hidden md:flex">
          <div className="p-6 border-b border-white/10">
            <img src={logoUrl} alt="Oceanway Tours" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-2 text-xs text-white/50 font-semibold uppercase tracking-wider">Admin Workspace</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('itineraries')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'itineraries' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <Map size={18} /> Manage Itineraries
            </button>
            <button 
              onClick={() => setActiveTab('enquiries')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'enquiries' ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <Mail size={18} /> Client Enquiries
            </button>
          </nav>
          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full text-sm font-semibold text-white/70 hover:text-white text-left px-4 py-2"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'dashboard' && (
              <section className="w-full max-w-4xl">
                <h1 className="font-display text-3xl text-forest mb-2">Travel Desk</h1>
                <p className="text-sm text-charcoal/70 mb-8">
                  Welcome to the OceanWay Tours admin panel. Select a module from the sidebar to start managing your platform.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                    <p className="font-display text-4xl text-forest">14</p>
                    <p className="mt-1 text-sm text-charcoal/65">Destinations</p>
                  </div>
                  <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                    <p className="font-display text-4xl text-forest">12</p>
                    <p className="mt-1 text-sm text-charcoal/65">Tour Packages</p>
                  </div>
                  <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                    <p className="font-display text-4xl text-forest">6</p>
                    <p className="mt-1 text-sm text-charcoal/65">Journal Entries</p>
                  </div>
                  <div className="border border-line bg-white p-5 rounded-xl shadow-sm">
                    <p className="font-display text-4xl text-forest">1</p>
                    <p className="mt-1 text-sm text-charcoal/65">New Enquiries</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'itineraries' && <ItinerariesManager />}
            {activeTab === 'enquiries' && <EnquiriesViewer />}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-forest px-6 py-12">
      <section className="w-full max-w-md bg-canvas p-8 sm:p-10 rounded-xl shadow-2xl">
        <img src={logoUrl} alt="Oceanway Tours" className="h-16 w-auto mb-12" />
        <div>
          <LockKeyholeIcon size={26} className="text-brand" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest">
            Travel desk access
          </h1>
          <p className="mt-3 text-sm leading-6 text-charcoal/70">
            Manage Oceanway destinations, tour packages, editorial content, and client requests.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <label className="grid gap-2 text-sm font-medium text-forest">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border-b border-forest/30 bg-transparent px-0 py-3 text-charcoal outline-none transition-colors duration-200 focus:border-brand"
              autoFocus
            />
          </label>
          {error && (
            <p className="mt-3 text-sm text-terracotta" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-forest"
          >
            Enter travel desk <LogInIcon size={16} />
          </button>
        </form>
        <p className="mt-7 border-t border-line pt-5 text-xs leading-5 text-charcoal/55">
          Demo access: <code className="font-semibold text-charcoal">{DEMO_PASSWORD}</code>
        </p>
      </section>
    </main>
  );
}
