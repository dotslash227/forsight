import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewsService} from '../../app/services/news.service';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'news',
  templateUrl: 'news.html',
  providers: [NewsService],
})
export class NewsPage {
  items: any;

  constructor(public navCtrl: NavController, private newsService: NewsService) {
  }

  ngOnInit(){
    // console.log('onInit ran');
    this.getPosts();
  }
  getPosts(){
    this.newsService.getPosts().subscribe(response=>{
      // console.log("news response=", response);
      this.items=response;

    });
  }
  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      'item': item,
    })
  }




}
