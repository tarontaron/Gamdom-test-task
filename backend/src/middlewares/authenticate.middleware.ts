import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../types/auth.types';
import extractAuthToken from '../utils/extractAuthToken';
import UnAuthorizedError from '../errors/unAuthorizedError';

const authenticateMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = extractAuthToken(req);

  if (!token) {
    next(new UnAuthorizedError('Unauthorized'));
    return;
  }

  const jwtPayload = jwt.decode(token);
  if (jwtPayload?.sub) {
    req.user = { id: +jwtPayload.sub };
  } else {
    next(new UnAuthorizedError('Unauthorized'));
    return;
  }

  next();
};

export default authenticateMiddleware;
