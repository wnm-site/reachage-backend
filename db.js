const mongoose = require('mongoose');

// Cache the connection across serverless invocations (warm instances reuse it).
// Without this, every cold start would create a brand-new Mongo connection.
let cached = global.__MONGO__ || { conn: null, promise: null };
if (!global.__MONGO__) global.__MONGO__ = cached;

mongoose.set('strictQuery', true);

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set. Add it in Vercel → Project → Settings → Environment Variables.');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Allow retry on the next request instead of keeping a broken promise
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

module.exports = { connectDB, mongoose };