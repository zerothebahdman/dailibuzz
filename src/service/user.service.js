const { User } = require('../../models');
const AppError = require('../class/AppError');
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
