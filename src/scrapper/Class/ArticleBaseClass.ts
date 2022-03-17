import axios from 'axios';
import log from '../../logging/logger';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { Category } from '../../index';

const { article, category } = new PrismaClient();
export interface Article {
  articleTitle?: string;
  articleUrl?: string;
  articleImage?: string;
}

export default class ArticleBaseClass {
  async fetchPage(url: string, n: number) {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (err: any) {
      if (n === 0) throw new Error(err.message);
      log.info(
        'fetchPage(): Waiting For 3 seconds before retrying the request.'
      );
    }
  }

  async exportResults(
    results: Article[],
    articleCategory: string,
    source: string
  ): Promise<void> {
    try {
      const _getCategory: Category = await category.findFirst({
        where: { name: articleCategory },
        select: {
          id: true,
          name: true,
        },
      });

      const data: any = [];

      for (const i of results) {
        data.push({
          name: i.articleTitle,
          url: i.articleUrl,
          nanoid: nanoid(),
          image: i.articleImage,
          category_id: _getCategory.id,
          source,
        });
      }

      await article.createMany({ data, skipDuplicates: true });
    } catch (err: any) {
      log.error(err);
    }
  }
}
