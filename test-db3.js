const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

process.env.MONGODB_URI = 'mongodb://chithilamanul1@gmail.com:chithila123@@187.77.128.167:27017/oceanway?authSource=admin&directConnection=true';

async function test() {
  const { connectDB } = await import('./src/lib/mongodb.ts');
  try {
    await connectDB();
    console.log('Success connecting to MongoDB with raw credentials!');
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e.message);
  }
  process.exit();
}
test();
