const jwt = require('jsonwebtoken');
const { join } = require('path');
const { promisify } = require('util');
const { readFile } = require('fs').promises;
const { User } = require('../../models');
const AppError = require('../class/AppError');
const log = require('../utils/logger');

exports.isAuthenticated = async (req, res, next) => {
  try {
    let token;
    // Get the token for the current user
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];
    //   Check if the user is authenticated
    if (!token) {
      return next(
        new AppError('You are not authenticated, please login.', 401)
      );
    }

    let PUBLIC_KEY;
    (async () => {
      try {
        PUBLIC_KEY = await readFile(
          join(__dirname, '../certs/public_key.pem'),
          'utf8'
        );
      } catch (err) {
        log.error(err.message);
      }
    })();
    let decodedToken;
    try {
      decodedToken = await promisify(jwt.verify)(token, PUBLIC_KEY, {
        algorithms: 'RS512',
      });
    } catch (err) {
      log.error(err.message);
      if (err.name === 'TokenExpiredError')
        return new AppError('Whoops!, your token has expired.', 401);
    }
    const { uuid, email } = decodedToken;
    const user = await User.findOne({ where: { email, uuid } });
    if (!user) return next(new AppError('Opps!, user does not exist', 404));

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};
