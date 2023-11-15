import { Application } from 'express';
import { authRoutes } from '@modules/auth/routes/auth.routes';
import { packageRoutes } from '@modules/package/routes/package.routes';
import { deliveryRoutes } from '@modules/delivery/routes/delivery.routes';

const V1_BASE_PATH = '/api';

export default (app: Application) => {
  const v1Routes = () => {
    app.use(V1_BASE_PATH, authRoutes.routes());
    app.use(V1_BASE_PATH, packageRoutes.routes());
    app.use(V1_BASE_PATH, deliveryRoutes.routes());
    app.get(V1_BASE_PATH, (req, res) => {
      return res.send('It works');
    });
  };
  v1Routes();
};
