const cron = require('node-cron');
const PunchClass = require('../class/PunchClass');
const logger = require('../../utils/logger');

cron.schedule('00 35,05 8,13 * * *', async () => {
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
