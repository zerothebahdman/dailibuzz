import Categoryservice from '../services/Category.service';
import { NextFunction, Response, Request } from 'express';
import AppException from '../../../../exceptions/AppException';

export default class CategoryController {
  constructor(private readonly categoryService: Categoryservice) {}

  async _createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.categoryService.createCategory(req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Category created successfully',
        category,
      });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
