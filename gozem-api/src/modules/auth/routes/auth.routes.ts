import express, { Router } from 'express';
import { loginController } from '@modules/auth/controllers/login.controller';
import { authenticated } from '@root/shared/middlewares/auth.middleware';

class AuthRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/login', loginController.login);
    this.router.post('/logout', loginController.logout);
    this.router.get('/profile', authenticated, loginController.getAuthenticatedUser);

    return this.router.use('/auth', this.router);
  }
}

export const authRoutes = new AuthRoutes();
