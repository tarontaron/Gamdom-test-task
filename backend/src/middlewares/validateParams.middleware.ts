import { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'joi';
import BadRequestError from '../errors/badRequestError';

const validateParamsMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;

    if (!params) {
      next(new BadRequestError('Params is required'));
      return;
    }

    const { error } = schema.validate(params);

    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    next();
  };
};

export default validateParamsMiddleware;
