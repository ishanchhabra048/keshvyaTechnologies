import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // ignore if in constrained environment
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
