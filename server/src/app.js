import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import { env } from './config/env.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { originCheck } from './middleware/originCheck.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', 1); // behind Render / Vercel proxy
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGINS, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(mongoSanitize());

if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use('/api', globalLimiter);
app.use('/api', originCheck);
app.use('/api', routes);

app.get('/api/health', (req, res) => {
  import('mongoose').then(mongoose => {
    res.json({ status: 'ok', uptime: process.uptime(), db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
