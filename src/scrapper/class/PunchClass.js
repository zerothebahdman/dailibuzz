/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const cheerio = require('cheerio');
const { writeFile } = require('fs');
const { Category, Article } = require('../../../models');
const logger = require('../../utils/logger');

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
      // logger.info(result.data);
      return result.data;
    } catch (err) {
      if (n === 0) throw new Error(err.message);
      logger.info(
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

          logger.info(`Created Promise for article: ${articleTitle}`);

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

  async getIndividualArticle() {
    try {
      const article = await Article.findAll();
      logger.info(article);
      for (const i of article) {
        logger.info(i);
        // eslint-disable-next-line no-await-in-loop
        const page = await this.fetchPage(i.url, 6);
        // eslint-disable-next-line no-unreachable-loop
        for (const a of page) {
          logger.info(`---------------`);
          logger.info(a);
          logger.info(`---------------`);
          const $ = cheerio.load(a);
          const getEntireArticle = $('.site-main > article')
            .map(async (index, element) => {
              const getArticleImage = $(element)
                .find('.entry-thumbnail-wrapper > picture > img')
                .attr('src');
              const getArticleBody = $(element)
                .find('.entry-main > p')
                .text()
                .trim();

              logger.info(
                `Created Promise for individual article: ${getArticleImage}`
              );
              return { getArticleImage, getArticleBody };
            })
            .get();
          return Promise.all(getEntireArticle);
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  exportEntireArticleResults(results, outputFile) {
    writeFile(outputFile, JSON.stringify(results, null, 4), (err) => {
      if (err) logger.info(err);
      logger.info(`${results.length} results exported to ${outputFile}`);
    });
  }

  async exportResults(results) {
    const getCategory = await Category.findOne({
      where: { name: this.category },
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const i of results) {
      // eslint-disable-next-line no-await-in-loop
      await Article.create({
        name: i.articleTitle,
        url: i.articleUrl,
        image: i.articleImage,
        categoryId: getCategory.id,
        source: this.source,
      });
      logger.info(`Completly saved to database`);
    }
  }
}

module.exports = PunchClass;
