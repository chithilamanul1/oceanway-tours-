import mongoose, { Schema, Model } from 'mongoose';
import { BlogPost } from '@/types/content';

const BlogPostSchema = new Schema<BlogPost>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: [{ type: String, required: true }],
    author: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    readTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const BlogPostModel: Model<BlogPost> =
  mongoose.models.BlogPost || mongoose.model<BlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;
