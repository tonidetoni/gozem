import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { Package } from './package';
import { PackageService } from './package.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AddressAutocompleteComponent, PlaceSearchResult } from '../address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'app-package-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AddressAutocompleteComponent],
  templateUrl: './package-create.component.html',
  styleUrl: './package-create.component.css'
})
export class PackageCreateComponent {
  @ViewChild('packageForm')
  packageForm!: NgForm;

  packageModel: Package = {
    description: '',
    weight: 0,
    height: 0,
    depth: 0,
    to_address: '',
    to_name: '',
    from_address: '',
    from_name: ''
  };

  address = '';

  constructor(
    private packageService: PackageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000
    });
  }
  onSubmit() {
    this.packageService.addPackage(this.packageModel).subscribe((result) => {
      this.openSnackBar();
      this.packageForm.reset()
      this.packageModel.from_address = ''
      this.packageModel.to_address = ''
    });
  }

  setAddress(place: PlaceSearchResult, field: 'from_address' | 'to_address') {
    this.packageModel[field] = place.address;
    if (field === 'from_address') {
      this.packageModel.from_location = place.location?.toJSON();
    } else if (field === 'to_address') {
      this.packageModel.to_location = place.location?.toJSON();
    }
  }
}
