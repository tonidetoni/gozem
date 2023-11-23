import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {MatTableModule} from '@angular/material/table';
import {Package} from "../package-create/package";
import {PackageService} from "../package-create/package.service";
import {Delivery} from "../delivery-create/delivery";
import {DeliveryService} from "../delivery-create/delivery.service";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  packages: Package[] = []
  deliveries: Delivery[] = []
  packagesNumber = 0
  deliveriesNumber = 0
  pageSize = 5
  packagePagination = Math.ceil(this.packagesNumber/this.pageSize)
  deliveryPagination = Math.ceil(this.deliveriesNumber/this.pageSize)
  packagePage = 0
  deliveryPage = 0

  constructor(private router: Router, private packageService: PackageService, private deliveryService: DeliveryService) {
  }

  goToPackageCreate() {
    this.router.navigate(['admin/package'])
  }

  goToDeliveryCreate() {
    this.router.navigate(['admin/delivery'])
  }

  getAllPackages(page = 1) {
    this.packagePage = page
    this.packageService.getAllPackages({ limit: this.pageSize, page: this.packagePage }).subscribe(result => {
      this.packages = result
    })
  }

  getPackagesCount() {
    this.packageService.getPackagesCount().subscribe(result => {
      this.packagesNumber = result
      this.packagePagination = Math.ceil(this.packagesNumber/this.pageSize)
    })
  }

  getPaginatedPackages(event: Event, page = 1) {
    event.preventDefault()
    if (this.packagePage === page || page <= 0 || page > Number(this.packagePagination)) return

    this.getAllPackages(page)
  }

  getAllDeliveries(page = 1) {
    this.deliveryPage = page
    this.deliveryService.getAllDeliveries({ page, limit: this.pageSize }).subscribe(result => {
      this.deliveries = result
    })
  }

  getPaginatedDeliveries(event: Event, page = 1) {
    event.preventDefault()
    if (this.deliveryPage === page || page <= 0 || page > Number(this.deliveryPagination)) return

    this.getAllDeliveries(page)
  }
  getDeliveriesCount() {
    this.deliveryService.getDeliveriesCount().subscribe(result => {
      this.deliveriesNumber = result
      this.deliveryPagination = Math.ceil(this.deliveriesNumber/this.pageSize)
    })
  }

  ngOnInit() {
    this.getAllPackages()
    this.getPackagesCount()
    this.getAllDeliveries()
    this.getDeliveriesCount()
  }

  protected readonly Number = Number;
}
