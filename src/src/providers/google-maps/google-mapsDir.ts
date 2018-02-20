import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../connectivity/connectivity';

declare var google;

@Injectable()
export class GoogleMapsDirProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  directions: any;
  distance: string;
  duration: string;
  userLon: number;
  userLat: number;
  optoLon: number;
  optoLat: number;
  constructor(public connectivityService: ConnectivityProvider) {

  }

  init(mapElement: any, pleaseConnect: any, userLon: number, userLat: number, optoLon: number, optoLat: number, ): Promise<any> {

    this.userLon = userLon;
    this.userLat = userLat;
    this.optoLon = optoLon;
    this.optoLat = optoLat;
    // console.log("coord in google maps dir = ", userLon, userLat, optoLon, optoLat);


    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then((values) => {
              resolve(values);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";
          this.apiKey = "AIzaSyCNy3fNswCBZ2gX162iYCwPQ8kFkQxqmNI";

          if (this.apiKey) {
            script.src = 'http://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      let latLng = new google.maps.LatLng(40.713744, -74.009056);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement, mapOptions);

      // this.addMarker(position.coords.latitude, position.coords.longitude);
      this.calculateAndDisplayRoute().then((values) => {
        this.directions = values["directions"];
        this.duration = values["duration"];
        this.distance = values["distance"];

        // console.log("dir=", values["directions"], values["distance"], values["duration"]);
        resolve(values);
      });


      //
      // Geolocation.getCurrentPosition().then((position) => {
      //
      //   // UNCOMMENT FOR NORMAL USE
      //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //   console.log(latLng)
      //
      // });

    });

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      console.log("online");
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    }, false);
    document.addEventListener('offline', () => {
      console.log("offline");
      this.disableMap();
    }, false);
  }

  addMarker(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      title: 'You are here',
    });

    this.markers.push(marker);

  }

  calculateAndDisplayRoute() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    let myLatLng = {
      lat: this.userLat,
      lng: this.userLon
    };
    let destLatLng = {
      lat: this.optoLat,
      lng: this.optoLon
    }
    return new Promise((resolve, reject) => {
      directionsService.route({
        origin: myLatLng,
        destination: destLatLng,
        // origin: document.getElementById('start').value,
        // destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
      }, function(response, status) {
        // console.log("response", response);
        this.directions = response.routes[0].legs[0].steps; //instructions
        this.duration = response.routes[0].legs[0].duration.text;
        this.distance = response.routes[0].legs[0].distance.text;

        // console.log(this.directions, this.duration, this.distance);
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          resolve({"directions": response.routes[0].legs[0].steps,"duration": response.routes[0].legs[0].duration.text,"distance": response.routes[0].legs[0].distance.text});
        } else {
          window.alert('Directions request failed due to ' + status);
          resolve(false);
        }

      })



    });

  }

}
