'use client';

import { FormEvent, useState } from 'react';
import { LockKeyholeIcon, LogInIcon } from 'lucide-react';

const DEMO_PASSWORD = 'oceanway';
const logoUrl = 'https://cdn.magicpatterns.com/uploads/ubYXeHwWAnuJmCZkRviSrc/logo.png';

export function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <main className="flex min-h-screen w-full items-center justify-center bg-forest px-6 py-12">
        <section className="w-full max-w-2xl bg-canvas p-8 sm:p-10">
          <img src={logoUrl} alt="Oceanway Tours" className="h-20 w-auto" />
          <div className="mt-8">
            <h1 className="font-display text-3xl text-forest">Travel Desk</h1>
            <p className="mt-2 text-sm text-charcoal/70">
              Welcome to the OceanWay Tours admin panel. Manage destinations, tour packages, journal
              entries, and client enquiries.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-line p-5">
              <p className="font-display text-4xl text-forest">14</p>
              <p className="mt-1 text-sm text-charcoal/65">Destinations</p>
            </div>
            <div className="border border-line p-5">
              <p className="font-display text-4xl text-forest">12</p>
              <p className="mt-1 text-sm text-charcoal/65">Tour Packages</p>
            </div>
            <div className="border border-line p-5">
              <p className="font-display text-4xl text-forest">6</p>
              <p className="mt-1 text-sm text-charcoal/65">Journal Entries</p>
            </div>
            <div className="border border-line p-5">
              <p className="font-display text-4xl text-forest">0</p>
              <p className="mt-1 text-sm text-charcoal/65">Unread Enquiries</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-charcoal/55">
            Full admin workspace with CRUD operations available via API routes at{' '}
            <code className="text-charcoal">/api/*</code>
          </p>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="mt-4 text-sm font-semibold text-forest hover:text-terracotta"
          >
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-forest px-6 py-12">
      <section className="w-full max-w-md bg-canvas p-8 sm:p-10">
        <img src={logoUrl} alt="Oceanway Tours" className="h-20 w-auto" />
        <div className="mt-12">
          <LockKeyholeIcon size={26} className="text-terracotta" aria-hidden="true" />
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
              className="border-b border-forest/30 bg-transparent px-0 py-3 text-charcoal outline-none transition-colors duration-200 focus:border-terracotta"
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
            className="mt-7 inline-flex items-center gap-2 bg-forest px-5 py-3 text-sm font-semibold text-canvas transition-colors duration-200 hover:bg-forest-light"
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
