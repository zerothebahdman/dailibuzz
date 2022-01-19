const PunchClass = require('../class/PunchClass');
const log = require('../../utils/logger');

const createArticle = (url, category, source) => {
  const article = new PunchClass(url, category, source);
  article
    .getArticle()
    .then((results) => {
      log.info(`Number of results: ${results.length}`);
      article.exportResults(results);
      log.info(results);
    })
    .catch((err) => {
      log.info(`Error while fetching news with error :::: ${err}`);
    });
};

module.exports = createArticle;
