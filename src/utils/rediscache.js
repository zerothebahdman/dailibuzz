const Redis = require('ioredis');
const AppError = require('../class/AppError');

const redis = new Redis();

const cache = (req, res, next) => {
  // const article
  redis.get('articles', (err, result) => {
    if (err) return next(AppError(err.message, err.status || 500));
    if (result !== null) {
      return res.status(200).json(JSON.parse(result));
    }
    next();
  });
};
module.exports = cache;
