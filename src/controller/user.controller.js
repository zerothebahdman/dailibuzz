const AppError = require('../class/AppError');
const userService = require('../service/user.service');
const { User } = require('../../models');

exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkIfUserExists = await User.findOne({
      where: { email },
    });
    if (checkIfUserExists) {
      return next(
        new AppError(
          `Opps! ${email} is already associated with an account`,
          503
        )
      );
    }
    const user = await userService.createUser(req.body, next);
    return res
      .status(200)
      .json({ status: 'success', token: user[0], account: user[1] });
  } catch (err) {
    return next(new AppError(err.message, err.status));
  }
};
