import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '@global/helpers/error-handler';
import { IUserDocument } from '@modules/auth/interfaces/auth.interface';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { authService } from '@service/database/auth.service';

interface JwtPayload {
  id: string;
}

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    throw new NotAuthorizedError('authentication require');
  }

  let user: IUserDocument | null;
  try {
    const payload: JwtPayload = JWT.verify(token, config.JWT_TOKEN) as JwtPayload;
    user = await authService.getUser({ uid: payload.id });
  } catch (e) {
    throw new NotAuthorizedError('authentication require');
  }
  if (!user) {
    throw new NotAuthorizedError('authentication require');
  }
  req.currentUser = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    uid: user.uid,
    role: user.role
  };

  next();
};
