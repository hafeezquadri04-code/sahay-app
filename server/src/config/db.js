import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.log('No MONGO_URI provided in env, skipping DB connection for scaffolding/test');
      return;
    }
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error('Server will start but DB-dependent features will not work.');
    console.error('If using Atlas: whitelist your IP at https://cloud.mongodb.com');
    // Don't exit - let the server start for non-DB routes
  }
};

export default connectDB;