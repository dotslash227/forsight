import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class OptometristService {
  http: any;
  baseUrl: string;
  baseUrl2: string;
  baseUrl3: string;

  optometrists: any;
  workplaces: any;
  specialisations: any;

  lon: number;
  lat: number;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'http://oapp.delhinerds.com/optometrist/';
    this.baseUrl2 = 'http://oapp.delhinerds.com/specialisation/';
    this.baseUrl3 = 'http://oapp.delhinerds.com/workplace/';


    this.getOptometristsInit();
    this.getWorkplaceInit();

  }

  getOptometristsInit() {
    return this.http.get(this.baseUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.optometrists = data;
      });
  }
  getWorkplaceInit(){
    return this.http.get(this.baseUrl3)
      .map(res => res.json())
      .subscribe(data => {
        this.workplaces = data;
      });
  }

  getOptometrists() {
    return this.optometrists;
  }

  getWorkplaces() {
    return this.workplaces;
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
    // console.log("this.optometrists spec service", this.optometrists);
    return this.optometrists.filter((item) => {
      // console.log("iem spec ayrray = ", item.specialisation);
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
