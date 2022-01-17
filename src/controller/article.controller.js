const Redis = require('ioredis');

const { Article, Category } = require('../../models');
const AppError = require('../class/AppError');
const log = require('../utils/logger');

const redis = new Redis();

exports.getArticle = async (req, res, next) => {
  try {
    // const {} = req.params;
    const article = await Article.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['uuid', 'name'],
      },
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
    const { source, category } = req.query;
    const articleCategory = await Category.findOne({
      where: { name: category },
    });
    const article = await Article.findAll({
      where: { source, categoryId: articleCategory.id },
    });
    res
      .status(200)
      .json({ status: 'success', dataReturned: article.length, article });
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
