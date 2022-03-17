import cron from 'node-cron';
import { article } from '../service/service.module';

cron.schedule('0 * * * *', async () => {
  article.techCrunchArticle('https://techcrunch.com/', 'Tech', 'tech-crunch');
});
