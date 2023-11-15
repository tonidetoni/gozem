import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  zoom = 10;

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  @Input()
  markerPositions: google.maps.LatLng[] = [];

  @Input()
  center: any = {};
  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit(): void {}
}
