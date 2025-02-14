import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import type { TAuthResponse, TLoginBody, TRegisterBody } from '../types/auth.types';
import { BCRYPT_SALT_ROUNDS, JWT_SECRET } from '../config/environment';
import UserModel from '../models/user.model';
import UnAuthorizedError from '../errors/unAuthorizedError';
import BadRequestError from '../errors/badRequestError';

export default {
  login: async (req: Request<{}, {}, TLoginBody>, res: Response<TAuthResponse>, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const candidate = await UserModel.findByEmail(email);
      if (!candidate) {
        next(new UnAuthorizedError('Invalid email or password'));
        return;
      }

      const verifyPassword = await compare(password, candidate.password);
      if (!verifyPassword) {
        next(new UnAuthorizedError('Invalid email or password'));
        return;
      }

      const tokenDetails: JwtPayload = {
        sub: candidate.id.toString(),
      };

      // todo => can be implemented sessions...
      const accessToken = jwt.sign(tokenDetails, JWT_SECRET);

      res.json({ accessToken });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  register: async (req: Request<{}, {}, TRegisterBody>, res: Response<TAuthResponse>, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const candidate = await UserModel.findByEmail(email);
      if (candidate) {
        next(new BadRequestError(`User with email ${email} already exists`));
        return;
      }

      const hashedPassword = await hash(password, +BCRYPT_SALT_ROUNDS);
      const createdUser = await UserModel.create({ name, email, password: hashedPassword });

      const tokenDetails: JwtPayload = {
        sub: createdUser.id.toString(),
      };

      // todo => can be implemented sessions...
      const accessToken = jwt.sign(tokenDetails, JWT_SECRET);

      res.status(201).json({ accessToken });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
