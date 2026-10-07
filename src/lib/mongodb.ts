import mongoose from 'mongoose';

// We fetch it dynamically inside connectDB to prevent build crashes
// if Vercel doesn't have the env variable injected during static analysis.

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/* Use global variable so connections persist across hot reloads in dev */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

const VALID_MONGODB_URI = 'mongodb://chithila:chithila123@187.77.128.167:27017/oceanway?authSource=admin';

export async function connectDB(): Promise<typeof mongoose> {
  let uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('chithilamanul1')) {
    uri = VALID_MONGODB_URI;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}
