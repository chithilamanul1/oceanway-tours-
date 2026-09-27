import type { Metadata } from 'next';
import { blogPostsSeed } from '@/data/blogPosts';
import { JournalClient } from './JournalClient';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Destination guides, planning advice, and inspiration from the OceanWay Tours team.',
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel Blog"
        title="Travel Tips & Stories"
        description="Destination guides, planning advice, and inspiration from the OceanWay Tours team—from Sri Lanka adventures to Saudi Arabia heritage tours and Bahrain city breaks."
        image="https://cdn.magicpatterns.com/patterns/generated-images/e1fa99c6-eafa-4f3f-abab-031adf7300bb.jpg"
      />
      <JournalClient posts={blogPostsSeed} />
    </>
  );
}
