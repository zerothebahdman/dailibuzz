import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import AppError from '../class/AppError';
import CategoryService from '../services/category.service';

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.create(name);
    return res.status(200).json({ status: 'success', category });
  } catch (err: any) {
    return next(new AppError(err.message, err.status));
  }
};
