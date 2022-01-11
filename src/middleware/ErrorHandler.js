// const AppError = require("../utils/AppErrorClass");

const setDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    error_stack: err.stack,
  });
};

const setProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(`Error 💣:`, err);

    res.status(500).json({
      status: `Error`,
      message: `Something went wrong.`,
    });
  }
};

// const handleSequelizeValidationError = (err) => {
//   const errors = Object.values(err.errors).map((value) => value.message);
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// };

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    setDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    // error.name = err.name;
    // error.code = err.code;
    // error.status = err.status;
    // if (error.type === `Validation error`)
    //   error = handleSequelizeValidationError(error);
    setProductionError(err, res);
  }
  next();
};
