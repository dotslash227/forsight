import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NewsService{
  http: any;
  baseUrl: string;
  constructor(http: Http){
    this.http = http;
    this.baseUrl = 'http://oapp.delhinerds.com/news/';
  }
  getPosts(){
    return this.http.get(this.baseUrl)
               .map(res=>res.json());
  }

}
