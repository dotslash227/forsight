import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { NavController, Platform } from 'ionic-angular';
// import {OptometristService} from '../../app/services/optometrist.service';
import { Geolocation } from 'ionic-native';
import {Http, RequestOptions, Headers} from '@angular/http';
import {OptometristPage} from '../optometrist/optometrist'
import {DirectionsPage} from '../directions/directions';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  // providers: [OptometristService],
})
export class MapPage {
  optometrists: any;
  optometristsByDistance: any;
  lon: number;
  lat: number;
  baseUrl: string;


  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController,
    public maps: GoogleMapsProvider,
    public platform: Platform,
    // private optometristService: OptometristService,
    private http: Http,
  ) {
    this.baseUrl = 'http://oapp.delhinerds.com/distance/';
    this.getOptometrists();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        // console.log(this.abc.nativeElement.innerText);
      }, 1000);

    });
  }
  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  getOptometrists() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')
    });
    let options = new RequestOptions({ headers: headers });

    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      // console.log("distance data mapsts=", this.lat, this.lon);

      return this.http.post(this.baseUrl, { lon: this.lon, lat: this.lat }, options)
        .map(res => res.json())
        .subscribe(response => {
          console.log("response here new=", response);
          this.optometristsByDistance = response["optometrists"];
        });
    });

  }

  search(item) {
    // console.log("item.photo in maps.ts before=", item.photo);
    item.photo = "http://oapp.delhinerds.com" + item.photo;
    // console.log("item.photo in maps.ts after=", item.photo);

    this.navCtrl.push(OptometristPage, {
      'item': item,
    })
  }

  getDirections(item) {
    this.navCtrl.push(DirectionsPage, {
      'item': item["optometrist"],
      'lon': this.lon,
      'lat': this.lat,
      'optoLon': item["workplace"]["long"],
      'optoLat': item["workplace"]["lat"],
         
    })
  }


}
