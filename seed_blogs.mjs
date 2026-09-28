import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const blogPostSchema = new mongoose.Schema({
  id: String,
  title: String,
  excerpt: String,
  content: [String],
  author: String,
  date: String,
  category: String,
  image: String,
  readTime: Number,
  seoTitle: String,
  seoDescription: String,
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

async function seed() {
  try {
    const data = fs.readFileSync('scraped_blogs.json', 'utf8');
    const posts = JSON.parse(data);
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');
    
    for (const post of posts) {
      await BlogPost.updateOne({ id: post.id }, { $set: post }, { upsert: true });
      console.log('Saved:', post.title);
    }
    
    console.log('Successfully seeded all posts!');
    process.exit(0);
  } catch (err) {
    console.error('Database error:', err);
    process.exit(1);
  }
}

seed();
