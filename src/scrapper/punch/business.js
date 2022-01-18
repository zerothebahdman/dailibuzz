const cron = require('node-cron');
const PunchClass = require('../class/PunchClass');
const log = require('../../utils/logger');

cron.schedule('00 00,00 8,12 * * *', async () => {
  const business = new PunchClass(
    'https://punchng.com/topics/business/',
    'Business',
    'punchng'
  );

  business
    .getArticle()
    .then((results) => {
      log.info(`number of results: ${results.length}`);
      business.exportResults(results);
      log.info(results);
    })
    .catch((err) => {
      log.info(`Error while fetching news with error :::: ${err}`);
    });
});
