import { Router } from 'express';
import { articleController } from '../controllers/controllers.module';
import CacheArticles from '../../../../scrapper/utils/Redis';
import { isAuthorized } from '../middlewares/authorization.middleware';
import { isAuthenticated } from '../middlewares/auth.middleware';

const route = Router();
route.route('/').get(isAuthorized, CacheArticles, (req, res, next) => {
  articleController.getAllArticles(res, next);
});
route.get('/query', (req, res, next) => {
  articleController.sortArtilces(req, res, next);
});
export default route;
