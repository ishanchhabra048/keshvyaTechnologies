import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import mongoose from 'mongoose';

const start = async () => {
  await connectDB();
  const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      mongoose.connection.close(false);
      console.log('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

if (env.NODE_ENV !== 'test') {
  start();
}
