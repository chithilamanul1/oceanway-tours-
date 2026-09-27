'use client';

import { useMemo, useState } from 'react';
import BlogCard from '@/components/cards/BlogCard';
import EmptyState from '@/components/ui/EmptyState';
import { BlogPost } from '@/types/content';

export function JournalClient({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? posts : posts.filter((post) => post.category === category);
  const [featured, ...remaining] = filtered;

  return (
    <section className="bg-canvas px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter journal posts">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                category === item
                  ? 'bg-forest text-canvas'
                  : 'border border-line text-forest hover:border-forest'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {featured ? (
          <>
            <div className="mt-12 border-b border-line pb-14">
              <BlogCard post={featured} featured />
            </div>
            <div className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {remaining.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="No entries yet"
              message="Try another category, or check back soon."
            />
          </div>
        )}
      </div>
    </section>
  );
}
