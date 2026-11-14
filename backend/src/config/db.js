import mongoose from 'mongoose';
import { env } from './env.js';

let connectionPromise;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', true);

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000
    }).then(connection => {
      console.log(
        `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`
      );
      return connection;
    });
  }

  try {
    return await connectionPromise;
  } finally {
    connectionPromise = undefined;
  }
}

export function getDatabaseState() {
  return mongoose.connection.readyState;
}