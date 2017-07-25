import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import { Geolocation } from 'ionic-native';


@Injectable()
export class OptometristService {
  http: any;
  baseUrl: string;
  baseUrl2: string;

  optometrists: any;
  optometristsByDistance: any;
  lon: number;
  lat: number;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = '/optometrist/';
    this.baseUrl2 = '/distance/';
    this.getOptometristsInit();
  }

  getOptometristsInit() {
    return this.http.get(this.baseUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.optometrists = data;
      });
  }

  getOptometrists() {
    return this.optometrists;
  }
  getOptometristsSubs() {
    return this.http.get(this.baseUrl)
      .map(res => res.json());

  }
  filterItemsByName(searchTerm) {
    return this.optometrists.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  filterItemsBySpec(searchTerm) {
    return this.optometrists.filter((item) => {
      return item.specialisation.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }
  getOptometristsNearMe() {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')
    });
    let options = new RequestOptions({ headers: headers });

    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.http.get(this.baseUrl2, { lon: this.lon, lat: this.lat }, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log("distance data opto.service=", data);
          this.optometristsByDistance = data;
          return this.optometristsByDistance;
        });
    });
  }
}
