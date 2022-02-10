import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import AppError from '../class/AppError';
import log from '../utils/logger';

const prisma = new PrismaClient();

export default class CategoryService {
  static async create(name: string) {
    try {
      const category = await prisma.category.create({
        data: {
          name: name,
          nanoid: nanoid(),
        },
      });
      return category;
    } catch (error: any) {
      return new AppError(error.message, error.status);
    }
  }
}
