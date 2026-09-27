import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import mongoose from 'mongoose';

const start = async () => {
  await connectDB();
  const port = process.env.PORT || env.PORT || 5000;
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 0.0.0.0:${port}`);
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
