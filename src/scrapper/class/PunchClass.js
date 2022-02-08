/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const cheerio = require('cheerio');
const { writeFile } = require('fs');
const { nanoid } = require('nanoid');

const { Category, Article } = require('../../../models');
const log = require('../../utils/logger').default;

/** 
 * Delete all data from article table
 * Article.destroy({
  where: {},
  truncate: true
}) */
class PunchClass {
  constructor(url, category, source) {
    this.url = url;
    this.category = category;
    this.source = source;
  }

  async fetchPage(url, n) {
    try {
      const result = await axios.get(url);
      // log.info(result.data);
      return result.data;
    } catch (err) {
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
        .map(async (index, element) => {
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
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // async getIndividualArticle() {
  //   try {
  //     const article = await Article.findAll();
  //     log.info(article);
  //     for (let i = 0; i < article.length; i++) {
  //       const page = article[i];
  //       const x = page.url;
  //       log.info(x);
  //       // for (let a = 0; a < x.length; a++) {
  //       //   const t = x[a];
  //       //   log.info(t);
  //       //   // const $ = cheerio.load(t);
  //       //   // log.info($);
  //       // }
  //     }
  //     // for (const i of article) {
  //     //   log.info(i);
  //     //   // eslint-disable-next-line no-await-in-loop
  //     //   const page = await this.fetchPage(i.url, 6);
  //     //   // eslint-disable-next-line no-unreachable-loop
  //     //   for (const a of page) {
  //     //     log.info(`---------------`);
  //     //     log.info(a);
  //     //     log.info(`---------------`);
  //     //     const $ = cheerio.load(a);
  //     //     const getEntireArticle = $('.site-main > article')
  //     //       .map(async (index, element) => {
  //     //         const getArticleImage = $(element)
  //     //           .find('.entry-thumbnail-wrapper > picture > img')
  //     //           .attr('src');
  //     //         const getArticleBody = $(element)
  //     //           .find('.entry-main > p')
  //     //           .text()
  //     //           .trim();

  //     //         log.info(
  //     //           `Created Promise for individual article: ${getArticleImage}`
  //     //         );
  //     //         return { getArticleImage, getArticleBody };
  //     //       })
  //     //       .get();
  //     //     return Promise.all(getEntireArticle);
  //     //   }
  //     // }
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // }

  exportEntireArticleResults(results, outputFile) {
    writeFile(outputFile, JSON.stringify(results, null, 4), (err) => {
      if (err) log.info(err);
      log.info(`${results.length} results exported to ${outputFile}`);
    });
  }

  async exportResults(results) {
    try {
      const getCategory = await Category.findOne({
        where: { name: this.category },
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const i of results) {
        // eslint-disable-next-line no-await-in-loop
        await Article.create(
          {
            name: i.articleTitle,
            url: i.articleUrl,
            nanoid: nanoid(),
            image: i.articleImage,
            categoryId: getCategory.id,
            source: this.source,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          },
          { ignoreDuplicates: true, validate: true }
        );
        log.info(`Completly saved to database`);
      }
    } catch (err) {
      log.error(err.message);
    }
  }
}

module.exports = PunchClass;
