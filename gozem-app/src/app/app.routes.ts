import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PackageCreateComponent } from './package-create/package-create.component';
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';
import { DriverComponent } from './driver/driver.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/package', component: PackageCreateComponent },
  { path: 'admin/delivery', component: DeliveryCreateComponent },
  { path: 'driver', component: DriverComponent }
];
