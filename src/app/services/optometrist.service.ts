import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class OptometristService {
  http: any;
  baseUrl: string;
  optometrists: any;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = '/optometrist/';
    this.getOptometristsInit();
  }

  getOptometristsInit() {
    return this.http.get(this.baseUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.optometrists = data;
      });
  }

  getOptometrists(){
    return this.optometrists;
  }
  getOptometristsSubs(){
    return this.http.get(this.baseUrl)
      .map(res => res.json());

  }
  filterItemsByName(searchTerm) {
    console.log("optometrists=", this.optometrists)
      return this.optometrists.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
  }
  filterItemsBySpec(searchTerm) {
    console.log("optometrists=", this.optometrists)
      return this.optometrists.filter((item) => {
        return item.specialisation.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
  }

}
