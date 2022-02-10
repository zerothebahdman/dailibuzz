import axios from 'axios';
import cheerio, { Element } from 'cheerio';
import { nanoid } from 'nanoid';

import { Error } from '../../middleware/ErrorHandler';
import log from '../../utils/logger';
import { PrismaClient } from '@prisma/client';

const { article, category } = new PrismaClient();

export interface Article {
  articleTitle?: string;
  articleUrl?: string;
  nanoid?: string;
  articleImage?: string;
  id?: string;
}

interface Category<T> {
  id?: T;
  name?: string | null;
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
      const getCategory: any = await category.findMany({
        where: { name: this.category },
        select: {
          id: true,
          name: true,
        },
      });

      // log.info(getCategory[0]);
      const data: any = [];

      for (const i of results) {
        data.push({
          name: i.articleTitle,
          url: i.articleUrl,
          nanoid: nanoid(),
          image: i.articleImage,
          category_id: getCategory[0].id,
          source: this.source,
        });
      }
      log.info(data);
      await article.createMany({ data });
    } catch (err: any) {
      log.error(err);
    }
  }
}
