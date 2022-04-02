import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import TokenService from '../../../../../services/Token.service';
import { RequestType } from '../../../../../index';
import { PrismaClient } from '@prisma/client';
import AppException from '../../../../../exceptions/AppException';
import log from '../../../../../logging/logger';
const { authorization } = new PrismaClient();

type Authorization = {
  accessToken: string;
  accessId: string;
  id?: string;
};

export default class UserAccessController {
  constructor(private readonly accessTokenService: TokenService) {}

  async _userAccess(req: RequestType, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const _accessToken = await this.accessTokenService.generateAccessToken();
      const _api_key = await this.accessTokenService.generateApiKey();
      const _authorization: Authorization = await authorization.findFirst({
        where: {
          user_id: id,
        },
      });
      if (_authorization) {
        await authorization.delete({
          where: { id: _authorization.id },
        });
      }

      await authorization.create({
        data: {
          accessToken: _accessToken.hashedAccessToken,
          accessId: _api_key.hashedApiKey,
          user_id: id,
        },
        select: { accessId: true, accessToken: true },
      });

      if (!_authorization)
        return next(
          new AppException(
            `Opps!, we could not create a new access token for you`,
            status.INTERNAL_SERVER_ERROR
          )
        );

      return res.status(200).json({
        status: 'success',
        message: 'User API KEY generated successfully',
        apiKey: _api_key.apiKey,
        accessToken: _accessToken.accessToken,
      });
    } catch (err: any) {
      log.info(err);
      return next(new AppException(err.message, err.status));
    }
  }
}
