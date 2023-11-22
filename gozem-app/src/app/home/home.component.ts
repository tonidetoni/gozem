import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Package } from '../package-create/package';
import { Delivery, Location } from '../delivery-create/delivery';
import { PackageService } from '../package-create/package.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  packageId = '';
  package: Package | null = null;
  delivery: Delivery | undefined;
  center = { lat: 5, lng: 1 };
  locations: google.maps.LatLng[] = [];

  constructor(
    private packageService: PackageService,
    private socketService: SocketService
  ) {}

  getPackageDetails() {
    this.packageService.getPackageDetails(this.packageId).subscribe((result) => {
      if (result) {
        this.package = result;
        this.delivery = result.delivery;
        this.setLocations(this.delivery?.location);
        this.socketService.socket.on(`status_changed`, ({status, deliveryId}) => {
          if (this.delivery && this.delivery.id === deliveryId) {
            this.delivery.status = status
          }
        })
        this.listenLocationChanged();
      }
    });
  }

  setLocations(deliveryLocation?: Location) {
    this.locations = [];
    if (this.package?.to_location) {
      this.locations.push(new google.maps.LatLng(this.package.to_location.lat, this.package.to_location.lng));
    }
    if (this.package?.from_location) {
      this.locations.push(new google.maps.LatLng(this.package.from_location.lat, this.package.from_location.lng));
    }
    if (deliveryLocation) {
      this.locations.push(new google.maps.LatLng(deliveryLocation.lat, deliveryLocation.lng));
      this.center = { lat: deliveryLocation.lat, lng: deliveryLocation.lng };
    }
  }

  listenLocationChanged() {
    this.socketService.socket.on(`location_changed-${this.delivery?.delivery_id}`, (location: Location) => {
      this.setLocations(location);
    });
  }
  ngOnInit() {}
}
