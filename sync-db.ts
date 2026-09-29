import mongoose from 'mongoose';
import { connectDB } from './src/lib/mongodb';
import { BlogPost, Itinerary } from './src/lib/models';
import { blogPostsSeed } from './src/data/blogPosts';
import { itinerariesSeed } from './src/data/itineraries';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function sync() {
    try {
        await connectDB();
        console.log('Connected to DB. Dropping and re-inserting Blog Posts and Itineraries...');
        
        await BlogPost.deleteMany({});
        await BlogPost.insertMany(blogPostsSeed);
        console.log(`Inserted ${blogPostsSeed.length} blog posts.`);
        
        await Itinerary.deleteMany({});
        await Itinerary.insertMany(itinerariesSeed);
        console.log(`Inserted ${itinerariesSeed.length} itineraries.`);
        
        console.log('Sync complete!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
sync();
