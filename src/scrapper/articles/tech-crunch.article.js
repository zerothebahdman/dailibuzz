const cron = require('node-cron');
const { techCrunchArticles } = require('../services/create-article.service');

cron.schedule('00 00,00 8,12 * * *', async () => {
  techCrunchArticles('https://techcrunch.com/', 'Tech', 'tech-crunch');
});
