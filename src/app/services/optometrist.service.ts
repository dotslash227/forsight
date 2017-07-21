import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class OptometristService{
  http: any;
  baseUrl: string;
  constructor(http: Http){
    this.http = http;
    // this.baseUrl = 'http://127.0.0.1:8000/optometrist/';
    this.baseUrl = '/optometrist';
  }
  getOptometrists(){
    return this.http.get(this.baseUrl)
             .map(res => res.json());
            //  .subscribe(data => {
            //   // this.posts = data.data.children;
            //   console.log("data in get opto=", data.data)
            //  });
  }

}
