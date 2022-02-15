import cron from 'node-cron';

import log from '../utils/logger';
import AppError from '../class/AppError';
import { NextFunction, Request, Response } from 'express';
import ArticleService from '../services/article.service';

export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await ArticleService.findArticle();
    return res.status(200).json({ status: 'success', article: data }); //, dataResult: data
  } catch (err: any) {
    return next(new AppError(err.message, err.status));
  }
};

export const sortArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await ArticleService.sortArticle(req);
    res.status(200).json({ status: 'success', data }); //dataResult: data.length
  } catch (err: any) {
    return next(new AppError(err.message, err.status));
  }
};
