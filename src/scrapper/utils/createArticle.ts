import PunchClass, { Article } from '../class/PunchClass';
import log from '../../utils/logger';
// import TechCrunchClass from '../class/TechCrunchClass';

export const punchArticle = (url: string, category: string, source: string) => {
  const article = new PunchClass(url, category, source);
  article
    .getArticle()
    .then((results: Article[]) => {
      log.info(`Number of results: ${results.length}`);
      article.exportResults(results);
    })
    .catch((err: any) => {
      log.info(`Error while fetching news with error :::: ${err}`);
    });
};

// exports.techCrunchArticles = (url, category, source) => {
//   const article = new TechCrunchClass(url, category, source);
//   article
//     .getArticle()
//     .then((results) => {
//       log.info(`Number of results: ${results.length}`);
//       article.exportResults(results, 'techcrunch.json');
//       log.info(results);
//     })
//     .catch((err) => {
//       log.info(`Error while fetching news with error :::: ${err}`);
//     });
// };
