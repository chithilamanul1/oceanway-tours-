import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { blogPostsSeed } from '@/data/blogPosts';
import { formatDate } from '@/utils/text';

export function generateStaticParams() {
  return blogPostsSeed.map((p) => ({ id: p.id }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const post = blogPostsSeed.find((item) => item.id === params.id);
  if (!post) notFound();

  const date = formatDate(post.date);

  return (
    <article className="bg-canvas">
      <section className="bg-forest px-6 py-8 text-canvas lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-sand hover:text-canvas">
            <ArrowLeftIcon size={16} /> The journal
          </Link>
        </div>
      </section>

      <header className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center lg:px-10 lg:pb-16 lg:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {post.category}
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-forest sm:text-6xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-charcoal/70">{post.excerpt}</p>
        <p className="mt-7 text-sm text-charcoal/60">
          By {post.author} · {date} · {post.readTime} min read
        </p>
      </header>

      <img
        src={post.image}
        alt=""
        className="mx-auto max-h-[620px] w-full max-w-7xl object-cover px-6 lg:px-10"
      />

      <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
        <div className="space-y-7 font-display text-2xl leading-[1.5] text-charcoal/85">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-sm text-charcoal/70">
          Want more from the field?{' '}
          <Link href="/contact" className="font-semibold text-forest underline">
            Plan a journey with us.
          </Link>
        </div>
      </div>
    </article>
  );
}
