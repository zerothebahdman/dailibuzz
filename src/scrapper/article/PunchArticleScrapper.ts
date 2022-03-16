import cron from 'node-cron';
import { article } from '../service/service.module';

/** this tasks runs after every hour */
cron.schedule('0 * * * *', async () => {});
article.punchArticle(
  'https://punchng.com/topics/entertainment/',
  'Entertainment',
  'punchng'
);

article.punchArticle('https://punchng.com/topics/news/', 'News', 'punchng');
article.punchArticle(
  'https://punchng.com/topics/business/',
  'Business',
  'punchng'
);
article.punchArticle('https://punchng.com/topics/sports/', 'Sports', 'punchng');
