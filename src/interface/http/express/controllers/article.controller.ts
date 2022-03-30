import { NextFunction, Request, Response } from 'express';
import AppException from '../../../../exceptions/AppException';
import ArticleService from '../services/Article.service';

export default class ArticleCategory {
  constructor(private readonly articleService: ArticleService) {}
  async getAllArticles(res: Response, next: NextFunction) {
    try {
      const _article = await this.articleService._getAllArticle(next);
      return res.status(200).json({ status: 'success', article: _article });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }

  async sortArtilces(req: Request, res: Response, next: NextFunction) {
    try {
      const _article = await this.articleService.sortArtilces(req.query, next);
      if (!_article) {
        return next(new AppException(`Opps! no article found`, 404));
      } else {
        return res.status(200).json({ status: 'success', article: _article });
      }
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
