const Redis = require('ioredis');

const { Article, Category } = require('../../models');
const log = require('../utils/logger');

const redis = new Redis();

exports.getAllArticle = async () => {
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

  return article;
};

exports.sortArticles = async (query) => {
  const queryObj = { ...query };
  const excludeKeyWords = ['sort', 'page', 'limit', 'fields'];
  excludeKeyWords.forEach((element) => delete queryObj[element]);
  log.info(queryObj);

  if (queryObj.category) {
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
    return article;
  }
  const article = await Article.findAll({
    where: { source: queryObj.source },
    attributes: ['name', 'nanoid', 'image', 'url', 'source'],
    include: {
      model: Category,
      as: 'category',
      attributes: ['uuid', 'name'],
    },
  });
  return article;
};
