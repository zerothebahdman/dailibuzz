import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import AppError from '../class/AppError';
import CategoryService from '../services/category.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = CategoryService.create(name);
    // const data = await prisma.category.create({
    //   data: {
    //     name: name,
    //     nanoid: nanoid(),
    //   },
    // });
    return res.status(200).json({ status: 'success', data: category });
  } catch (err: any) {
    return next(new AppError(err.message, err.status));
  }
};
