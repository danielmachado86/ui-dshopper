import { Component, AfterViewInit, OnInit, ElementRef, NgZone, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements AfterViewInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;

  constructor(private ngZone: NgZone,) { }

  ngAfterViewInit(): void {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          
          for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {
              if (place.address_components[i].types[j] == "country") {
                this.country = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[j] == "locality") {
                this.city = place.address_components[i].long_name;
              }
            }
          }
          console.log(this.longitude + ", " + this.latitude + ", " + this.country + ", " + this.city);
        });
      });
  }

}
