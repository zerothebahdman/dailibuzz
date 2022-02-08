const { Op } = require('sequelize');
const cron = require('node-cron');

const { Article } = require('../../models');
const AppError = require('../class/AppError');
const log = require('../utils/logger');
const articleService = require('../service/article.service');

exports.getArticle = async (req, res, next) => {
  try {
    const article = await articleService.getAllArticle();
    res
      .status(200)
      .json({ status: 'success', numberOfData: article.length, article });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};

exports.sortArticle = async (req, res, next) => {
  try {
    const article = await articleService.sortArticles(req.query);
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

cron.schedule('0 * * * *', () => {
  (async () => {
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
  })();
});
