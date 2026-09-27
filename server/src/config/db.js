import mongoose from 'mongoose';
import { env } from './env.js';

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
