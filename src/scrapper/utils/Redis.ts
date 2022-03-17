import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import AppException from '../../exceptions/AppException';

const redis = new Redis();

const CacheArticles = (req: Request, res: Response, next: NextFunction) => {
  redis.get('articles', (err: any, result) => {
    if (err) return next(new AppException(err.message, err.status || 500));
    if (result !== null) {
      return res.status(200).json(JSON.parse(result));
    }
    next();
  });
};
export default CacheArticles;
