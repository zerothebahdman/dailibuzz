import { Request } from 'express';
import Redis from 'ioredis';
import log from '../utils/logger';
import { PrismaClient } from '@prisma/client';

const { article } = new PrismaClient();
const redis = new Redis();

export default class ArticleService {
  static async findArticle() {
    const data = await article.findMany({
      select: {
        name: true,
        source: true,
        image: true,
        nanoid: true,
        url: true,
      },
    });
    // const article = await Article.findAll({
    //   order: [['createdAt', 'DESC']],
    //   include: {
    //     model: Category,
    //     as: 'category',
    //     attributes: ['nanoid', 'name'],
    //   },
    //   attributes: ['name', 'nanoid', 'image', 'url', 'source'],
    // });

    redis.set(
      'articles',
      JSON.stringify(article),
      'ex',
      60
    ); /** Expires after 6 hours*/
    return article;
  }

  static async sortArticle(sort: Request) {
    // const queryObj = { ...sort.query };
    // const excludeKeyWords = ['sort', 'page', 'limit', 'fields'];
    // excludeKeyWords.forEach((element) => delete queryObj[element]);
    // log.info(queryObj);
    // let article;
    // if (!queryObj.category) {
    //   article = await Article.findAll({
    //     where: { source: queryObj.source },
    //     attributes: ['name', 'nanoid', 'image', 'url', 'source'],
    //     include: {
    //       model: Category,
    //       as: 'category',
    //       attributes: ['uuid', 'name'],
    //     },
    //   });
    // } else {
    //   const articleCategory = await Category.findOne({
    //     where: { name: queryObj.category },
    //   });
    //   article = await Article.findAll({
    //     where: { source: queryObj.source, categoryId: articleCategory.id },
    //     attributes: ['name', 'nanoid', 'image', 'url', 'source'],
    //     include: {
    //       model: Category,
    //       as: 'category',
    //       attributes: ['uuid', 'name'],
    //     },
    //   });
    // }
    // return article;
  }
}
