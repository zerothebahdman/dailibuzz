const cron = require('node-cron');
const { punchArticle } = require('../utils/createArticle');

cron.schedule('00 00,00 8,12 * * *', async () => {
  /**cron will run every day by 8:00AM and 12:00PM */
  punchArticle(
    'https://punchng.com/topics/entertainment/',
    'Entertainment',
    'punchng'
  );
  punchArticle('https://punchng.com/topics/news/', 'News', 'punchng');
  punchArticle('https://punchng.com/topics/business/', 'Business', 'punchng');
  punchArticle('https://punchng.com/topics/sports/', 'Sports', 'punchng');
});
