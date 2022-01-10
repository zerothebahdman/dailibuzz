const axios = require('axios');
const cheerio = require('cheerio');
const { Article } = require('../../../models');

class PunchClass {
  constructor(url, category, source) {
    this.url = url;
    this.category = category;
    this.source = source;
  }

  async fetchPage(url, n) {
    try {
      const result = await axios.get(url);
      console.log(result.data);
      return result.data;
    } catch (err) {
      if (n === 0) throw new Error(err.message);
      console.log(
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

          console.log(`Created Promise for article: ${articleTitle}`);

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

  async exportResults(results) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of results) {
      Article.create({
        name: i.articleTitle,
        url: i.articleUrl,
        image: i.articleImage,
        category: this.category,
        source: this.source,
      });
      console.log(`Completly saved to database`);
    }
  }
}

module.exports = PunchClass;
