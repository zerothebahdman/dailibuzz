const PunchClass = require('../class/PunchClass');
const log = require('../../utils/logger');
const TechCrunchClass = require('../class/TechCrunchClass');

exports.punchArticle = (url, category, source) => {
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

exports.techCrunchArticles = (url, category, source) => {
  const article = new TechCrunchClass(url, category, source);
  article
    .getArticle()
    .then((results) => {
      log.info(`Number of results: ${results.length}`);
      article.exportResults(results, 'techcrunch.json');
      log.info(results);
    })
    .catch((err) => {
      log.info(`Error while fetching news with error :::: ${err}`);
    });
};
