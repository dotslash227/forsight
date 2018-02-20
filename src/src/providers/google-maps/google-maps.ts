import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from 'ionic-native';
import {OptometristService} from '../../app/services/optometrist.service';


declare var google;

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  optometrists: any = [];
  workplaces: any = [];
  


  constructor(public connectivityService: ConnectivityProvider,
    private optometristService: OptometristService
  ) {
    // this.initMap();
    // this.enableMap();
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");

        console.log("here disableMap2");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";
          this.apiKey = "AIzaSyCNy3fNswCBZ2gX162iYCwPQ8kFkQxqmNI";

          if (this.apiKey) {
            script.src = 'http://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.googleapis.com/maps/api/js?callback=mapInit';
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
          console.log("here disableMap2")
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      Geolocation.getCurrentPosition().then((position) => {

        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //let latLng = new google.maps.LatLng(40.713744, -74.009056);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.getOptometrists();
        // var image = {
        //   url: "assets/icon/person.png",
        //   size: new google.maps.Size(20, 32),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(0, 32)
        // };
        this.addMarker(position.coords.latitude, position.coords.longitude, "You are here", "assets/icon/person.png");

        resolve(true);

      });

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
      console.log("here disableMap 3")
      this.disableMap();

    }, false);

  }

  addMarker(lat: number, lng: number, title: string, icon: string): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      title: title,
      label: {
        text: title,
        color: "#eb3a44",
        fontSize: "16px",
        fontWeight: "bold"
      },
      options: {
        icon: {
          url: icon,
          scaledSize: new google.maps.Size(34, 34),
          origin: new google.maps.Point(0, 0), // origin
          // anchor: new google.maps.Point(0, 0), // anchor
          anchor: new google.maps.Point(32, 65),
          labelOrigin: new google.maps.Point(25, 40)
        }
      }
    });
    this.markers.push(marker);

  }

  getOptometrists() {

    // this.optometrists = this.optometristService.getOptometrists()
    
    // for (let each of this.optometrists) {
    //   this.addMarker(Number(each["lat"]), Number(each["lon"]), each["name"], "assets/icon/opto.png");
    // }

    this.workplaces = this.optometristService.getWorkplaces()
    
    for (let each of this.workplaces) {
      this.addMarker(Number(each["latitutde"]), Number(each["longitude"]), each["workplace_name"], "assets/icon/opto.png");
    }

  }

}
