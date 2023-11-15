import { CookieOptions, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
import { zodValidator } from '@global/decorators/zod-validation.decorators';
import { BadRequestError } from '@global/helpers/error-handler';
import { COOKIE_OPTIONS } from '@global/helpers/constants';
import { loginValidator } from '@modules/auth/schemes/login.validator';
import { IUserDocument, LoginDto } from '@modules/auth/interfaces/auth.interface';
import { authService } from '@service/database/auth.service';

class LoginController {
  @zodValidator(loginValidator)
  public async login(req: Request, res: Response): Promise<Response> {
    const dto: LoginDto = req.body;
    const { email, password } = dto;
    const user: IUserDocument | null = await authService.getUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new BadRequestError('invalid_credentials');
    }

    const token = JWT.sign({ id: user.uid }, config.JWT_TOKEN);
    res.cookie('token', token, COOKIE_OPTIONS as CookieOptions);

    return res.status(StatusCodes.OK).json({ message: 'login_successfully' });
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    res.cookie('token', null);
    return res.status(StatusCodes.OK).json({ message: 'logout_successful' });
  }

  public async getAuthenticatedUser(req: Request, res: Response): Promise<Response> {
    if (req.currentUser) {
      return res.status(StatusCodes.OK).json(req.currentUser);
    }
    throw new BadRequestError('user_not_found');
  }
}

export const loginController = new LoginController();
