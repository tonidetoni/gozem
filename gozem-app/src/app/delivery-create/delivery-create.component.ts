import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Delivery } from './delivery';
import { PackageService } from '../package-create/package.service';
import { Package } from '../package-create/package';
import { DeliveryService } from './delivery.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delivery-create',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './delivery-create.component.html',
  styleUrl: './delivery-create.component.css'
})
export class DeliveryCreateComponent {
  deliveryModel: Delivery = {
    package_id: ''
  };
  delivery_id = '';

  packages: Package[] = [];

  constructor(
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private _snackBar: MatSnackBar
  ) {}

  getPackages() {
    this.packageService.getAllPackages({ limit: 100 }).subscribe((packages) => {
      this.packages = packages;
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000
    });
  }

  onSubmit() {
    this.deliveryService.addDelivery(this.deliveryModel.package_id).subscribe((result) => {
      if (result?.status === 201) {
        this.openSnackBar();
      }
    });
  }

  ngOnInit() {
    this.getPackages();
  }
}
