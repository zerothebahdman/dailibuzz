import cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import ArticleBaseClass from './ArticleBaseClass';
import log from '../../logging/logger';
import { ScrappedArticle } from '../../helpers/index';

export default class PunchScrapperClass extends ArticleBaseClass {
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
      const articles = $('.entries-grid > .grid-item > article')
        .map(async (index, element: any) => {
          const articleImage = $(element)
            .find('.entry-item-thumbnail > a > img')
            .attr('src');
          const articleTitle = $(element)
            .find('.entry-item-main > h3 > a')
            .text()
            .trim();
          const articleUrl = $(element)
            .find('.entry-item-main > h3 > a')
            .attr('href');

          log.info(`Created Promise for article: ${articleTitle}`);

          return {
            articleImage,
            articleTitle,
            articleUrl,
          };
        })
        .get();
      return Promise.all(articles);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
