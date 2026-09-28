import type { Metadata } from 'next';
import { blogPostsSeed } from '@/data/blogPosts';
import { JournalClient } from './JournalClient';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Destination guides, planning advice, and inspiration from the OceanWay Tours team.',
};

import { connectDB } from '@/lib/mongodb';
import { BlogPost as BlogPostModel } from '@/lib/models';

export const revalidate = 60;

export default async function JournalPage() {
  let posts = blogPostsSeed;

  try {
    await connectDB();
    const dbPosts = await BlogPostModel.find().lean();
    if (dbPosts.length > 0 && dbPosts.length < 10) {
      // Force sync: drop old seed and insert new WP scraped posts
      await BlogPostModel.deleteMany({});
      await BlogPostModel.insertMany(blogPostsSeed);
      posts = blogPostsSeed;
    } else if (dbPosts.length === 0) {
      await BlogPostModel.insertMany(blogPostsSeed);
      posts = blogPostsSeed;
    } else {
      posts = JSON.parse(JSON.stringify(dbPosts));
    }
  } catch (error) {
    console.error('MongoDB fetch failed, using seed data.', error);
  }

  return (
    <>
      <PageHero
        eyebrow="Travel Blog"
        title="Travel Tips & Stories"
        description="Destination guides, planning advice, and inspiration from the OceanWay Tours team—from Sri Lanka adventures to Saudi Arabia heritage tours and Bahrain city breaks."
        image="https://cdn.magicpatterns.com/patterns/generated-images/e1fa99c6-eafa-4f3f-abab-031adf7300bb.jpg"
      />
      <JournalClient posts={posts} />
    </>
  );
}
