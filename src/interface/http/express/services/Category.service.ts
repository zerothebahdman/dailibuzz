import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import AppException from '../../../../exceptions/AppException';
import CategoryValidator from '../../../../validators/CategoryValidator';
import log from '../../../../logging/logger';
import { Category } from '../../../../index';

const { category } = new PrismaClient();

export default class Categoryservice {
  static async createCategory(reqObj: Category): Promise<Category> {
    try {
      const _validateResource: Category = await CategoryValidator.validateAsync(
        reqObj
      );
      const _category = await category.create({
        data: { name: _validateResource.name, nanoid: nanoid() },
        select: { name: true, nanoid: true },
      });
      return _category;
    } catch (err) {
      log.error(err);
    }
  }
}
