import { Request, Response, NextFunction } from 'express';
import UserService from '../../../../services/User.service';
import AppException from '../../../../exceptions/AppException';

import { PrismaClient } from '@prisma/client';

export default class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.getAllUsers();
      return res.status(200).json({ status: 'success', data });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
