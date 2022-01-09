const cheerio = require('cheerio');
const axios = require('axios');
const { writeFile } = require('fs');

const baseUrl = 'https://punchng.com/topics/news/';
// const baseUrl = 'https://www.imdb.com';
// const trmUrl = `${baseUrl}/chart/top?ref_=nv_mv_250`;
const fetchPage = async (url, n) => {
  try {
    const result = await axios.get(url);
    console.log(result.data);
    return result.data;
  } catch (err) {
    if (n === 0) throw new Error(err.message);
    console.log(
      'fetchPage(): Waiting For 3 seconds before retrying the request.'
    );
    return await fetchPage(url, n - 1);
  }
};

const getArticle = async () => {
  try {
    const html = await fetchPage(baseUrl, 6);

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
};

const exportResults = (results, outputFile) => {
  writeFile(outputFile, JSON.stringify(results, null, 4), (err) => {
    if (err) console.log(err);
    console.log(`${results.length} results exported to ${outputFile}`);
  });
};

getArticle()
  .then((results) => {
    console.log(`number of results: ${results.length}`);
    exportResults(results, 'articles.json');
    console.log(results);
  })
  .catch((err) => {
    console.log(`Error while fetching news with error :::: ${err}`);
  });
