const cron = require('node-cron');
const PunchClass = require('../class/PunchClass');
const logger = require('../../utils/logger');

cron.schedule('00 00,00 8,12 * * *', async () => {
  /**cron will run every day by 8:30AM and 12:00PM */
  const entertainment = new PunchClass(
    'https://punchng.com/topics/entertainment/',
    'Entertainment',
    'punchng'
  );

  entertainment
    .getArticle()
    .then((results) => {
      logger.info(`number of results: ${results.length}`);
      entertainment.exportResults(results);
      // logger.info(results);
    })
    .catch((err) => {
      logger.info(`Error while fetching news with error :::: ${err}`);
    });
});
