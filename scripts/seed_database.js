const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://chithila:chithila123@187.77.128.167:27017/oceanway?authSource=admin';

async function seed() {
  console.log('Connecting to remote MongoDB at 187.77.128.167...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected successfully!');

  const genericSchema = new mongoose.Schema({}, { strict: false });
  const Destination = mongoose.models.Destination || mongoose.model('Destination', genericSchema);
  const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', genericSchema);
  const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', genericSchema);
  const MediaItem = mongoose.models.MediaItem || mongoose.model('MediaItem', genericSchema);

  // Load data modules
  const { destinationsSeed } = await import('../src/data/destinations.ts');
  const { itinerariesSeed } = await import('../src/data/itineraries.ts');
  const { extraItineraries } = await import('../src/data/extraItineraries.ts');
  const { blogPostsSeed } = await import('../src/data/blogPosts.ts');
  const { mediaSeed } = await import('../src/data/mediaSeed.ts');

  // Seed Destinations
  console.log(`Seeding ${destinationsSeed.length} destinations...`);
  for (const d of destinationsSeed) {
    await Destination.updateOne({ id: d.id }, { $set: d }, { upsert: true });
  }

  // Seed Itineraries
  const allItineraries = [...itinerariesSeed, ...extraItineraries];
  console.log(`Seeding ${allItineraries.length} itineraries...`);
  for (const it of allItineraries) {
    await Itinerary.updateOne({ id: it.id }, { $set: it }, { upsert: true });
  }

  // Seed Blog Posts
  console.log(`Seeding ${blogPostsSeed.length} blog posts...`);
  for (const b of blogPostsSeed) {
    await BlogPost.updateOne({ id: b.id }, { $set: b }, { upsert: true });
  }

  // Seed Media Items
  console.log(`Seeding ${mediaSeed.length} media items...`);
  for (const m of mediaSeed) {
    const { _id, ...cleanMedia } = m;
    await MediaItem.updateOne({ url: m.url }, { $set: cleanMedia }, { upsert: true });
  }

  console.log('--- Database Verification ---');
  console.log('Destinations in DB:', await Destination.countDocuments());
  console.log('Itineraries in DB:', await Itinerary.countDocuments());
  console.log('Blog Posts in DB:', await BlogPost.countDocuments());
  console.log('Media Items in DB:', await MediaItem.countDocuments());
  console.log('--- SEED COMPLETED 100% ---');

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
