import { PrismaClient } from '@prisma/client';
import { NextFunction } from 'express';
import AppException from '../../../../exceptions/AppException';

const { article } = new PrismaClient();

export default class ArticleService {
  static async _getAllArticle(next: NextFunction) {
    try {
      const _article = await article.findMany({
        select: {
          name: true,
          image: true,
          url: true,
          nanoid: true,
          source: true,
          Category: { select: { name: true, nanoid: true } },
        },
      });
      return _article;
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
