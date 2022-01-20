const cron = require('node-cron');
const createArticle = require('../utils/createArticle');

cron.schedule('00 00,00 8,12 * * *', async () => {
  /**cron will run every day by 8:00AM and 12:00PM */
  createArticle(
    'https://punchng.com/topics/entertainment/',
    'Entertainment',
    'punchng'
  );
  createArticle('https://punchng.com/topics/news/', 'News', 'punchng');
  createArticle('https://punchng.com/topics/business/', 'Business', 'punchng');
  createArticle('https://punchng.com/topics/sports/', 'Sports', 'punchng');
});
