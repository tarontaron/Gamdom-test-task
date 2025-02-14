import { Response, NextFunction } from 'express';

import UserModel, { IUser } from '../models/user.model';
import NotFoundError from '../errors/notFoundError';
import { IAuthRequest } from '../types/auth.types';

export default {
  findMe: async (req: IAuthRequest, res: Response<IUser>, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const user = await UserModel.findById(id);

      if (!user) {
        next(new NotFoundError(`User with id ${id} not found.`));
        return;
      }

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
};
