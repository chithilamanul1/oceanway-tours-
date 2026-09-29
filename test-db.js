const { loadEnvConfig } = require('@next/env');
const path = require('path');
loadEnvConfig(process.cwd());

async function test() {
  const { connectDB } = await import('./src/lib/mongodb.ts');
  try {
    await connectDB();
    console.log('Success connecting to MongoDB!');
  } catch (e) {
    console.error('Failed to connect to MongoDB:', e.message);
  }
  process.exit();
}
test();
