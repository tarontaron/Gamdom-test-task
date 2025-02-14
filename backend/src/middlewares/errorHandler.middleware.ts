import { DatabaseError } from 'pg';
import { Response, Request, NextFunction } from 'express';

import NotFoundError from '../errors/notFoundError';
import UnAuthorizedError from '../errors/unAuthorizedError';
import InternalServerError from '../errors/internalServerError';
import BadRequestError from '../errors/badRequestError';
import ConflictError from '../errors/conflictError';

const errorHandlerMiddleware = async (
  err: any, _: Request,
  res: Response,
  next: NextFunction,
) => {
  switch (err.constructor) {
    case BadRequestError:
      res.status(400).json({ message: err.message });
      break;
    case UnAuthorizedError:
      res.status(401).json({ message: err.message });
      break;
    case NotFoundError:
      res.status(404).json({ message: err.message });
      break;
    case ConflictError:
      res.status(409).json({ message: err.message });
      break;
    case InternalServerError:
      res.status(500).json({ message: err.message });
      break;
    default:
      if (err instanceof DatabaseError) {
        // todo => can be add more details...
        res.status(500).json({ message: '[Database Error]: ' + err.detail });
        return;
      }

      res.status(500).json({ message: 'Internal Server Error' });
  }

  next(null);
};

export default errorHandlerMiddleware;
