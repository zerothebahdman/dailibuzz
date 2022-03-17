import { Router } from 'express';
import { articleController } from '../controllers/controllers.module';

const route = Router();
route.route('/').get((req, res, next) => {
  articleController.getAllArticles(req, res, next);
});

export default route;
