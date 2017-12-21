import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NewsService{
  http: any;
  baseUrl: string;
  constructor(http: Http){
    this.http = http;
    this.baseUrl = 'http://127.0.0.1:8000/news/';
  }
  getPosts(){
    return this.http.get(this.baseUrl)
               .map(res=>res.json());
  }

}
