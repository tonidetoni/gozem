import express, { Router } from 'express';
import { packageController } from '@modules/package/controllers/package.controller';
import { authenticated } from '@root/shared/middlewares/auth.middleware';
import { adminMiddleware } from '@root/shared/middlewares/admin.middleware';

class PackageRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/package/', [authenticated, adminMiddleware], packageController.create);
    this.router.put('/package/:id', [authenticated, adminMiddleware], packageController.update);
    this.router.get('/package/:id', [authenticated, adminMiddleware], packageController.getByPackageId);
    this.router.get('/package/', [authenticated, adminMiddleware], packageController.getAllPackages);
    this.router.delete('/package/:id', [authenticated, adminMiddleware], packageController.delete);

    return this.router;
  }
}

export const packageRoutes = new PackageRoutes();
