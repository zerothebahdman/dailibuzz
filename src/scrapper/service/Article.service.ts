import PunchScrapperClass from '../Class/PunchScrapperClass';
import log from '../../logging/logger';
import TechCrunchArticleScrapper from '../Class/TechCrunchScrapperClass';

export default class ArticleService {
  async punchArticle(url: string, category: string, source: string) {
    const article = new PunchScrapperClass(url, category, source);
    article
      .getArticle()
      .then((results) => {
        log.info(`Number of results ${results.length}`);
        article.exportResults(results, category, source);
        log.info(results);
      })
      .catch((err) => {
        log.info(`Error while fetching articles with error :::: ${err}`);
      });
  }

  async techCrunchArticle(url: string, category: string, source: string) {
    const article = new TechCrunchArticleScrapper(url, category, source);
    article
      .getArticle()
      .then((results) => {
        log.info(`Number of results ${results.length}`);
        article.exportResults(results, category, source);
        log.info(results);
      })
      .catch((err) => {
        log.info(`Error while fetching articles with error :::: ${err}`);
      });
  }
}
