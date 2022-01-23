const Redis = require('ioredis');
const { Op } = require('sequelize');
const cron = require('node-cron');

const { Article, Category } = require('../../models');
const AppError = require('../class/AppError');
const log = require('../utils/logger');

const redis = new Redis();

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        model: Category,
        as: 'category',
        attributes: ['nanoid', 'name'],
      },
      attributes: ['name', 'nanoid', 'image', 'url', 'source'],
    });

    redis.set(
      'articles',
      JSON.stringify(article),
      'ex',
      60
    ); /** Expires after 6 hours*/
    res
      .status(200)
      .json({ status: 'success', numberOfData: article.length, article });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};

exports.sortArticle = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludeKeyWords = ['sort', 'page', 'limit', 'fields'];
    excludeKeyWords.forEach((element) => delete queryObj[element]);
    log.info(queryObj);
    if (!queryObj.category) {
      const article = await Article.findAll({
        where: { source: queryObj.source },
        attributes: ['name', 'nanoid', 'image', 'url', 'source'],
        include: {
          model: Category,
          as: 'category',
          attributes: ['uuid', 'name'],
        },
      });
      res
        .status(200)
        .json({ status: 'success', dataReturned: article.length, article });
    } else {
      const articleCategory = await Category.findOne({
        where: { name: queryObj.category },
      });

      const article = await Article.findAll({
        where: { source: queryObj.source, categoryId: articleCategory.id },
        attributes: ['name', 'nanoid', 'image', 'url', 'source'],
        include: {
          model: Category,
          as: 'category',
          attributes: ['uuid', 'name'],
        },
      });
      res
        .status(200)
        .json({ status: 'success', dataReturned: article.length, article });
    }
  } catch (err) {
    log.error(err.message);
    return next(
      new AppError(
        `Invalid filter parameter provided. Provide a valid fiter parameter`,
        err.status
      )
    );
  }
};

(() => {
  cron.schedule('0 * * * *', async () => {
    const articles = await Article.findAll({
      where: { expiresAt: { [Op.lt]: Date.now() } },
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const article of articles) {
      log.info(article.nanoid);
      // eslint-disable-next-line no-await-in-loop
      await Article.destroy({ where: { nanoid: article.nanoid } });
      log.info(`Deleted ${article.nanoid}`);
    }
  });
})();
