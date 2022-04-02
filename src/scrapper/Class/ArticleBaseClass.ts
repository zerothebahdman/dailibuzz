import axios from 'axios';
import log from '../../logging/logger';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import { Category } from '../../helpers/index';

const { article, category } = new PrismaClient();
export interface Article {
  articleTitle?: string;
  articleUrl?: string;
  articleImage?: string;
}

interface ExportArticle {
  id?: string;
  nanoid: string;
  category_id?: string;
  source: string;
  image: string;
  name: string;
  url: string;
  expires_at: Date;
}

export default class ArticleBaseClass {
  async fetchPage(url: string, n: number) {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (err: any) {
      if (n === 0) throw new Error(err.message);
      log.error(
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
      for (let i = 0; i < results.length; i++) {
        const articleData = [
          results[i].articleTitle,
          results[i].articleUrl,
          results[i].articleImage,
        ];
        const articleExists = await article.findMany({
          where: {
            name: {
              equals: articleData[0],
            },
            url: {
              equals: articleData[1],
            },
            image: {
              equals: articleData[2],
            },
          },
          select: {
            id: true,
            nanoid: true,
          },
        });
        if (articleExists.length === 0) {
          const _article: ExportArticle = {
            nanoid: nanoid(),
            name: articleData[0],
            image: articleData[2],
            url: articleData[1],
            source: source,
            category_id: _getCategory.id,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          };
          await article.create({ data: _article });
        }
      }
    } catch (err: any) {
      log.error(err);
    }
  }
}
