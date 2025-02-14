import { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'joi';

import BadRequestError from '../errors/badRequestError';

const validateBodyMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    if (!body) {
      next(new BadRequestError('Body is required'));
      return;
    }

    const { error } = schema.validate(body);

    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    next();
  };
};

export default validateBodyMiddleware;
