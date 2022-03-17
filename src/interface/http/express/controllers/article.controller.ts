import { NextFunction, Response } from 'express';
import AppException from '../../../../exceptions/AppException';
import ArticleService from '../services/Article.service';

export default class ArticleCategory {
  async getAllArticles(res: Response, next: NextFunction) {
    try {
      const _article = await ArticleService._getAllArticle(next);
      return res.status(200).json({ status: 'success', article: _article });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
