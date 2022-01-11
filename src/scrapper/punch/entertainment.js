const cron = require('node-cron');
const PunchClass = require('../class/PunchClass');

cron.schedule('00 35,05 8,13 * * *', async () => {
  const entertainment = new PunchClass(
    'https://punchng.com/topics/entertainment/',
    'Entertainment',
    'punchng'
  );

  entertainment
    .getArticle()
    .then((results) => {
      console.log(`number of results: ${results.length}`);
      entertainment.exportResults(results);
      // console.log(results);
    })
    .catch((err) => {
      console.log(`Error while fetching news with error :::: ${err}`);
    });
});
