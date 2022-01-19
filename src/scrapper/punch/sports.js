const cron = require('node-cron');
const createArticle = require('../utils/createArticle');

cron.schedule('00,08 00,00 9,12 * * *', async () => {
  /**cron will run every day by 9:00AM and 12:00PM */
});
createArticle('https://punchng.com/topics/sports/', 'Sports', 'punchng');
