import type { Metadata } from 'next';
import { JournalClient } from './JournalClient';
import PageHero from '@/components/ui/PageHero';
import { connectDB } from '@/lib/mongodb';
import { BlogPost as BlogPostModel } from '@/lib/models';

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Destination guides, planning advice, and inspiration from the OceanWay Tours team.',
};

export const revalidate = 60; // ISR every 60s

export default async function JournalPage() {
  let posts: any[] = [];

  try {
    await connectDB();
    const dbPosts = await BlogPostModel.find().lean();
    posts = JSON.parse(JSON.stringify(dbPosts));
  } catch (error) {
    console.error('MongoDB fetch failed on Journal page', error);
  }

  return (
    <>
      <PageHero
        eyebrow="Travel Blog"
        title="Travel Tips & Stories"
        description="Destination guides, planning advice, and inspiration from the OceanWay Tours team."
        image="https://cdn.magicpatterns.com/patterns/generated-images/e1fa99c6-eafa-4f3f-abab-031adf7300bb.jpg"
      />
      <JournalClient posts={posts} />
    </>
  );
}
