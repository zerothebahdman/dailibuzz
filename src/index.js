require('./scrapper/punch/news');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./class/AppError');
const ErrorHandler = require('./middleware/ErrorHandler');
const articleRouter = require('./routes/article');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/article/', articleRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the server.`, 404));
});
app.use(ErrorHandler);

module.exports = app;
