const Redis = require('ioredis');

const { Article, Category } = require('../../models');
const AppError = require('../class/AppError');

const redis = new Redis();

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['uuid', 'name'],
      },
    });

    redis.set('articles', JSON.stringify(article), 'ex', 6 * 60 * 60 * 100);
    res
      .status(200)
      .json({ status: 'success', numberOfData: article.length, article });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};
