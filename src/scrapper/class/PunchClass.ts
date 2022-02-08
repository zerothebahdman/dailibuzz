import axios from 'axios';
import cheerio, { Element } from 'cheerio';
import { nanoid } from 'nanoid';

import { Error } from '../../middleware/ErrorHandler';
import log from '../../utils/logger';
import { PrismaClient } from '@prisma/client';

const { article, category } = new PrismaClient();

export interface Article {
  articleTitle: string;
  articleUrl: string | undefined;
  nanoid?: string;
  articleImage: string | undefined;
  id?: string;
}

export default class PunchClass {
  constructor(
    public url: string,
    public category: string,
    public source: string
  ) {}

  private async fetchPage(url: string, n: number) {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (err: any) {
      if (n === 0) throw new Error(err.message);
      if (n === 0) throw new Error(err.message);
      log.info(
        'fetchPage(): Waiting For 3 seconds before retrying the request.'
      );
    }
  }

  async getArticle() {
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

  public async exportResults(results: Article[]) {
    try {
      // const getCategory = await category.findFirst({
      //   where: { name: this.category },
      // });

      results.map(async (index, element: any) => {
        const t = await article.create({
          data: {
            name: element.articleName,
            url: element.articleUrl,
            nanoid: nanoid(),
            image: element.articleImage,
            category_id: 1,
            source: this.source,
            // // @ts-ignore
            // created_at: Date.now(),
            // // @ts-ignore
            // updated_at: Date.now(),
            // // @ts-ignore
            // expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
          },
        });
        log.info(`Completly saved to database`);
        return t;
      });

      // for (const i of results) {
      //   await article.create({
      //     data: {
      //       name: i.articleTitle,
      //       url: i.articleUrl,
      //       nanoid: nanoid(),
      //       image: i.articleImage,
      //       category_id: 1,
      //       source: this.source,
      //       // @ts-ignore
      //       created_at: Date.now(),
      //       // @ts-ignore
      //       updated_at: Date.now(),
      //       // @ts-ignore
      //       expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
      //     },
      //   });
      //   log.info(`Completly saved to database`);
      // }
    } catch (err: any) {
      log.error(err);
    }
  }
}
