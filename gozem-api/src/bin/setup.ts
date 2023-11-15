import { databaseConnection } from '@root/database';
import * as process from 'process';
import { UserModel } from '@modules/auth/models/user.schema';
import { authService } from '@service/database/auth.service';

(async function () {
  await databaseConnection();
  //Save admin user
  const admin = await authService.getUserByEmail('admin@gozem.app');
  if (!admin) {
    await authService.createUser({
      email: 'admin@gozem.app',
      firstname: 'Admin',
      lastname: 'Admin',
      role: 'admin',
      password: 'admin'
    });
  }
  const driver = await authService.getUserByEmail('driver@gozem.app');
  if (!driver) {
    await authService.createUser({
      email: 'driver@gozem.app',
      firstname: 'Driver',
      lastname: 'Driver',
      role: 'driver',
      password: 'driver'
    });
  }

  process.exit();
})();
