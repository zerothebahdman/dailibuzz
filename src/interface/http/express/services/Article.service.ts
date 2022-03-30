import { PrismaClient } from '@prisma/client';
import { NextFunction, Request } from 'express';
import AppException from '../../../../exceptions/AppException';
import Redis from 'ioredis';
import log from '../../../../logging/logger';
import { ReqObject } from '../../../../index';

const redis = new Redis();
const prisma = new PrismaClient();

export default class ArticleService {
  async _getAllArticle(next: NextFunction) {
    try {
      const _article = await prisma.article.findMany({
        select: {
          name: true,
          image: true,
          url: true,
          nanoid: true,
          source: true,
          Category: { select: { name: true, nanoid: true } },
        },
        orderBy: [{ created_at: 'desc' }],
      });

      redis.set('article', JSON.stringify(_article), 'ex', 60);

      return _article;
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }

  async sortArtilces(reqObject: any, next: NextFunction) {
    try {
      const queryObj = { ...reqObject };
      const excludeKeyWords = ['sort', 'page', 'limit', 'fields'];
      excludeKeyWords.forEach((element: any) => delete queryObj[element]);

      if (queryObj.category) {
        const articleCategory = await prisma.category.findFirst({
          where: { name: queryObj.category },
          select: { id: true },
        });

        const _article = await prisma.article.findMany({
          where: {
            source: queryObj.source,
            category_id: articleCategory.id,
          },
          select: {
            nanoid: true,
            name: true,
            image: true,
            url: true,
            source: true,
            Category: { select: { name: true, nanoid: true } },
          },
        });

        if (_article.length === 0) {
          return next(
            new AppException(
              'Opps!, no article found from provided filter params',
              404
            )
          );
        }
      }

      const _article = await prisma.article.findMany({
        where: { source: queryObj.source },
        select: {
          nanoid: true,
          name: true,
          image: true,
          url: true,
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
