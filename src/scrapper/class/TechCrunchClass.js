const axios = require('axios');
const cheerio = require('cheerio');
const { nanoid } = require('nanoid');
const { Category, Article } = require('../../../models');

const log = require('../../utils/logger').default;

class TechCrunchClass {
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
      //   log.info(html);
      const $ = cheerio.load(html);
      const article = $('.content-wrap > .content > .river > .post-block')
        .map(async (index, element) => {
          const articleUrl = $(element).find('header > h2 > a').attr('href');
          const articleTitle = $(element).find('header > h2 > a').text().trim();
          const articleImage = $(element)
            .find('footer > figure > a > img')
            .attr('src');

          log.info(`Created Promise for article: ${articleTitle}`);

          return {
            articleImage,
            articleTitle,
            articleUrl,
          };
        })
        .get();
      log.info(article);
      return Promise.all(article);
    } catch (err) {
      log.error(err.message);
      throw new Error(err.message);
    }
  }

  async exportResults(results) {
    // writeFile(outputFile, JSON.stringify(results, null, 4), (err) => {
    //   if (err) log.info(err);
    //   log.info(`${results.length} results exported to ${outputFile}`);
    // });
    const getCategory = await Category.findOne({
      where: { name: this.category },
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const i of results) {
      // eslint-disable-next-line no-await-in-loop
      await Article.create({
        name: i.articleTitle,
        url: i.articleUrl,
        nanoid: nanoid(),
        image: i.articleImage,
        categoryId: getCategory.id,
        source: this.source,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      log.info(`Completly saved to database`);
    }
  }
}

module.exports = TechCrunchClass;
