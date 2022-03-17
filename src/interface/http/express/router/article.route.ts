import { Router } from 'express';
import { articleController } from '../controllers/controllers.module';
import CacheArticles from '../../../../scrapper/utils/Redis';

const route = Router();
route.route('/').get(CacheArticles, (req, res, next) => {
  articleController.getAllArticles(res, next);
});

export default route;
