import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('MongoDB connected successfully');
  } catch (initialErr) {
    console.warn(`Initial MongoDB connection failed (${initialErr.message}), attempting fallback DNS resolution...`);
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
      });
      console.log('MongoDB connected via fallback DNS');
    } catch (fallbackErr) {
      console.error(`MongoDB connection error: ${fallbackErr.message}`);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    }
  }
};

