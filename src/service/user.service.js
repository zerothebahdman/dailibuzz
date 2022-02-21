const { User } = require('../../models');
const AppError = require('../class/AppError');
const log = require('../utils/logger');
const authenticationService = require('./authentication.service');

exports.createUser = async (body, next) => {
  try {
    const { name, email, password } = body;
    const hashedPassword = await authenticationService.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = authenticationService.generateToken(user.uuid, user.email);

    return [token, user];
  } catch (err) {
    return next(new AppError(err.message, 503));
  }
};

exports.loginUser = async (body, next) => {
  try {
    const { email, password } = body;
    if (!email || !password)
      next(new AppError(`Please provide an email and password`, 400));

    const user = await User.findOne({ where: { email } });
    if (
      !user ||
      !(await authenticationService.verifyPassword(password, user.password))
    )
      return next(new AppError(`Incorrect email or password`, 401));

    const jwtToken = authenticationService.generateToken(user.uuid, user.email);
    return jwtToken;
  } catch (err) {
    log.error(err.message);
    return next(new AppError(err.message, err.status));
  }
};
