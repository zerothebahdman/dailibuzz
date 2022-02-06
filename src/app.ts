// require('./scrapper/punch/punch.article');
// require('./scrapper/tech-crunch/tech-crunch.article');

import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import responseTime from 'response-time';
import { rateLimit } from 'express-rate-limit';

import AppError from './class/AppError';
import ErrorHandler from './middleware/ErrorHandler';
import articleRoute from './routes/article.route';

const rateLimiter = rateLimit({
  max: 100, //max amount of requests per 30min
  windowMs: 30 * 60 * 1000, // 30Mins in milliseconds
  headers: true,
  message: `Opps! You've exceeded 80 request in 30 mins limit`,
});

const app: Application = express();
app.use(express.json());
app.use(responseTime());
app.use('/api', rateLimiter);

app.use('/api/v1/article/', articleRoute);
// app.use('/api/v1/category/', categoryRouter);

if (process.env.NODE_ENV !== 'production') {
}
app.use(morgan('dev'));
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError(`Cant find ${req.originalUrl} on the server.`, 404));
});

app.use(ErrorHandler);

export default app;
