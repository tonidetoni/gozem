import express, { Router } from 'express';
import { deliveryController } from '@modules/delivery/controllers/delivery.controller';
import { authenticated } from '@root/shared/middlewares/auth.middleware';
import { adminMiddleware } from '@root/shared/middlewares/admin.middleware';

class DeliveryRoutes {
  private readonly router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/delivery', [authenticated, adminMiddleware], deliveryController.create);
    this.router.put('/delivery/:id', deliveryController.update);
    this.router.get('/delivery', [authenticated, adminMiddleware], deliveryController.getAllDeliveries);
    this.router.get('/delivery/:id', deliveryController.getByDeliveryId);
    this.router.delete('/delivery/:id', [authenticated, adminMiddleware], deliveryController.deleteById);

    return this.router;
  }
}

export const deliveryRoutes = new DeliveryRoutes();
