import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { formatDate } from '@/utils/text';
import { connectDB } from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: revalidate every minute

export async function generateStaticParams() {
  await connectDB();
  const posts = await BlogPost.find({}, 'id').lean();
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  await connectDB();
  const post = await BlogPost.findOne({ id: params.id }).lean();
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.seoTitle || `${post.title} | OceanWay Tours`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.image ? [{ url: post.image }] : undefined,
    }
  };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = await BlogPost.findOne({ id: params.id }).lean();
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
          By {post.author} · {date} · {post.readTime || 2} min read
        </p>
      </header>

      <img
        src={post.image}
        alt={post.title}
        className="mx-auto max-h-[620px] w-full max-w-7xl object-cover px-6 lg:px-10"
      />

      <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
        <div className="space-y-7 font-display text-2xl leading-[1.5] text-charcoal/85">
          {post.content.map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
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
