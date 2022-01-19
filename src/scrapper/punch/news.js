const cron = require('node-cron');
const createArticle = require('../utils/createArticle');

cron.schedule('00,08 00,00 8,12 * * *', async () => {
  /**cron will run every day by 8:30AM and 12:00PM */
  createArticle('https://punchng.com/topics/news/', 'News', 'punchng');
});
