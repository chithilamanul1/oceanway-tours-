const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

// OVERRIDE FOR TEST
process.env.MONGODB_URI = 'mongodb://chithilamanul1%40gmail.com:chithila123%40@187.77.128.167:27017/oceanway?authSource=oceanway&directConnection=true';

async function test() {
  const { connectDB } = await import('./src/lib/mongodb.ts');
  try {
    await connectDB();
    console.log('Success connecting to MongoDB with authSource=oceanway!');
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e.message);
  }
  process.exit();
}
test();
