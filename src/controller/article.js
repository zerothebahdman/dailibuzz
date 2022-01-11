const { Article, Category } = require('../../models');
const AppError = require('../class/AppError');

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['uuid', 'name'],
      },
    });

    res.status(200).json({ status: 'success', article });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};
