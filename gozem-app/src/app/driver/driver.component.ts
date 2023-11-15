import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Package} from "../package-create/package";
import {Delivery, Location} from "../delivery-create/delivery";
import {DeliveryService} from "../delivery-create/delivery.service";
import {MapComponent} from "../map/map.component";
import {SocketService} from "../socket.service";



@Component({
  selector: 'app-driver',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MapComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {

  deliveryId: string = ''
  package: Package | null = null
  delivery: Delivery | null = null
  updating = false
  locations: google.maps.LatLng[] = []
  center = { lat: 1, lng: 1 }
  watchID = 0
  currentPosition: { lat: number, lng: number} | undefined

  constructor(private deliveryService: DeliveryService, private socketService: SocketService) {}

  getDeliveryDetails() {
    if (!this.deliveryId) return
    this.deliveryService.getDelivery(this.deliveryId).subscribe((result: Delivery) => {
      if (result) {
        this.delivery = result
        this.package = result?.package || null
        if (this.package?.to_location) {
          this.center = { lat: this.package?.to_location.lat, lng: this.package?.to_location.lng}
          this.locations.push(new google.maps.LatLng(this.package.to_location.lat, this.package.to_location.lng))
        }
        if (this.package?.from_location) {
          this.locations.push(new google.maps.LatLng(this.package.from_location.lat, this.package.from_location.lng))
        }
      }
    })
  }

  updateDeliveryStatus(status: string) {
    this.updating = true
    const body: Partial<Delivery> = {
      status
    }
    switch (status) {
      case 'picked-up':
        body.pickup_time = new Date()
        break;
      case 'in-transit':
        body.start_time = new Date()
        body.location = this.currentPosition
        break;
      case 'delivered':
        body.end_time = new Date()
        break;
      case 'failed':
        body.end_time = new Date()
    }
    this.deliveryService.update(this.delivery?.id!, body).subscribe(result => {
      if (result && result.status === 200) {
        this.delivery = result.body
      }
      this.updating = false
    })
  }

  ngOnInit() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = { lat: position.coords.latitude, lng: position.coords.longitude}
        this.currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        this.locations.push(new google.maps.LatLng(this.center.lat, this.center.lng))
      });

      this.watchID = navigator.geolocation.watchPosition((position) => {
        // this.locations.push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        this.currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude }

        if (this.delivery && this.delivery.status === 'in-transit') {
          this.socketService.socket.emit('location_changed', { location: this.currentPosition, deliveryId: this.delivery.delivery_id })
        }
      });
    }
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
