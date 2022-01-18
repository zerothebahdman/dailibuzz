const { nanoid } = require('nanoid');
const { Category } = require('../../models');
const AppError = require('../class/AppError');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
      nanoid: nanoid(),
    });
    res.status(200).json({ status: 'success', category });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};
module.exports = createCategory;
