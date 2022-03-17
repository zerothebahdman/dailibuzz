import log from '../../logging/logger';
import ArticleBaseClass from './ArticleBaseClass';
import cheerio from 'cheerio';
import { ScrappedArticle, Element } from '../../index';

export default class TechCrunchArticleScrapper extends ArticleBaseClass {
  constructor(
    public url: string,
    public category: string,
    public source: string
  ) {
    super();
  }

  async getArticle(): Promise<ScrappedArticle[]> {
    try {
      const html = await this.fetchPage(this.url, 6);
      const $ = cheerio.load(html);
      const article = $('.content-wrap > .content > .river > .post-block')
        .map(async (index: number, element: Element) => {
          const articleUrl = $(element).find('header > h2 > a').attr('href');
          const articleTitle = $(element).find('header > h2 > a').text().trim();
          const articleImage = $(element)
            .find('footer > figure > a > img')
            .attr('src');
          log.info(`Created Promise for article: ${articleTitle}`);
          return { articleImage, articleTitle, articleUrl };
        })
        .get();
      log.info(article);
      return Promise.all(article);
    } catch (err: any) {
      log.error(err.message);
      throw new Error(err.message);
    }
  }
}
