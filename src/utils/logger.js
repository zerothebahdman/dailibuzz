const logger = require('pino');
const pretty = require('pino-pretty');

const stream = pretty({
  colorize: true,
  translateTime: true,
});
const log = logger(stream);

module.exports = log;
