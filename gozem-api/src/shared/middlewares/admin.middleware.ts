import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '@global/helpers/error-handler';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser?.role !== 'admin') {
    throw new NotAuthorizedError('permission denied');
  }
  next();
};
