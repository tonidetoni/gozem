import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-address-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './address-autocomplete.component.html',
  styleUrl: './address-autocomplete.component.css'
})
export class AddressAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Enter address...';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  listener: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          iconUrl: place?.icon
        };

        this.placeChanged.emit(result);
      });
    });
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
