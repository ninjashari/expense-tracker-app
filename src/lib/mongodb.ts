import mongoose from 'mongoose';

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  let mongoose: CachedMongoose | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;
const globalMongoose = global as unknown as { mongoose: CachedMongoose };

if (!globalMongoose.mongoose) {
  globalMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (globalMongoose.mongoose.conn) {
    return globalMongoose.mongoose.conn;
  }

  if (!globalMongoose.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose);
  }

  try {
    const mongooseInstance = await globalMongoose.mongoose.promise;
    globalMongoose.mongoose.conn = mongooseInstance;
  } catch (e) {
    globalMongoose.mongoose.promise = null;
    throw e;
  }

  return globalMongoose.mongoose.conn;
}

export default connectDB; 