const cron = require('node-cron');
const PunchClass = require('../class/PunchClass');
const logger = require('../../utils/logger');

cron.schedule('00 00,00 8,12 * * *', async () => {
  /**cron will run every day by 8:30AM and 12:00PM */
  const news = new PunchClass(
    'https://punchng.com/topics/news/',
    'News',
    'punchng'
  );
  news
    .getArticle()
    .then((results) => {
      logger.info(`number of results: ${results.length}`);
      news.exportResults(results);
      logger.info(results);
    })
    .catch((err) => {
      logger.info(`Error while fetching news with error :::: ${err}`);
    });
});
