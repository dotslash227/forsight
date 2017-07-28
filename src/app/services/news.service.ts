import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NewsService{
  http: any;
  baseUrl: string;
  constructor(http: Http){
    this.http = http;
     = 'http://192.178.7.5:8000/news/';
  }
  getPosts(){
    return this.http.get()
               .map(res=>res.json());
  }

}
