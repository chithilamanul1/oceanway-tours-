'use client';

import { FormEvent, useState } from 'react';
import { LockKeyholeIcon, LogInIcon } from 'lucide-react';

const logoUrl = '/logo.png';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        // Refresh the page to trigger the server component to read the cookie
        window.location.reload();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-forest px-6 py-12">
      <section className="w-full max-w-md bg-canvas p-8 sm:p-10 rounded-xl shadow-2xl">
        <img src={logoUrl} alt="Oceanway Tours" className="h-16 w-auto mb-12" />
        <div>
          <LockKeyholeIcon size={26} className="text-brand" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest">
            Secure Travel Desk
          </h1>
          <p className="mt-3 text-sm leading-6 text-charcoal/70">
            Please enter your secure admin password to access the CMS.
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
              disabled={isLoading}
            />
          </label>
          {error && (
            <p className="mt-3 text-sm text-terracotta" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-forest disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Enter travel desk'} <LogInIcon size={16} />
          </button>
        </form>
      </section>
    </main>
  );
}
