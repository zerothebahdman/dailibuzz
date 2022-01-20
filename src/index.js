require('./scrapper/punch/punch.article');
require('./scrapper/tech-crunch/tech-crunch.article');
const express = require('express');
const morgan = require('morgan');
const responseTime = require('response-time');

const AppError = require('./class/AppError');
const ErrorHandler = require('./middleware/ErrorHandler');
const articleRouter = require('./routes/article.router');
const categoryRouter = require('./routes/category.router');

const app = express();
app.use(express.json());
app.use(responseTime());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/article/', articleRouter);
app.use('/api/v1/category/', categoryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the server.`, 404));
});
app.use(ErrorHandler);

module.exports = app;
