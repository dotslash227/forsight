import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class OptometristService {
  http: any;
  baseUrl: string;
  baseUrl2: string;


  optometrists: any;
  specialisations: any;

  lon: number;
  lat: number;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = '/optometrist/';
    this.baseUrl2 = '/specialisation/';

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
    console.log("this.optometrists spec service", this.optometrists);
    return this.optometrists.filter((item) => {
      console.log("iem spec ayrray = ", item.specialisation);
      for (var i = 0; i < item.specialisation.length; i++) {
        if (item.specialisation[i].title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
          return item;
      }
    });
  }

  getSpecialisationInit() {
    return this.http.get(this.baseUrl2)
      .map(res => res.json())
  }



}
