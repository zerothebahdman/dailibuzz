import { Router } from 'express';
import { categoryController } from '../controllers/controllers.module';
import { isAuthenticated } from '../middlewares/auth.middleware';

const route = Router();
route
  .route('/')
  .get()
  .post((req, res, next) => {
    categoryController._createCategory(req, res, next);
  });

export default route;
