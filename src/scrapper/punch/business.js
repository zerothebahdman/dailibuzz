const cron = require('node-cron');
const createArticle = require('../utils/createArticle');

cron.schedule('00 00,00 8,12 * * *', async () => {
  createArticle('https://punchng.com/topics/business/', 'Business', 'punchng');
});
