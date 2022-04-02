import { NextFunction, Request, Response } from 'express';
import AppException from '../../../../exceptions/AppException';
import log from '../../../../logging/logger';
import { PrismaClient } from '@prisma/client';
import { RequestType } from '../../../../index';
import { createHash } from 'crypto';

const { authorization } = new PrismaClient();

export const isAuthorized = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const _notAuthorized = () =>
      next(
        new AppException(
          `Opps!, You are not authorized to make this request`,
          401
        )
      );

    const { access_token, api_key } = req.headers;
    if (!access_token || !api_key) return _notAuthorized();

    const _hashedAccessToken: string = createHash('sha512')
      .update(access_token)
      .digest('base64');

    const _hashedAccessId: string = createHash('sha512')
      .update(api_key)
      .digest('hex');

    log.info({ _hashedAccessId, _hashedAccessToken });
    const _authorization = await authorization.findFirst({
      where: {
        accessToken: _hashedAccessToken,
        accessId: _hashedAccessId,
        // user_id: req.user.id,
      },
    });
    log.info(_authorization);
    if (!_authorization) return _notAuthorized();
    next();
  } catch (err: any) {
    log.error(err);
    return next(new AppException(err.message, err.status));
  }
};
