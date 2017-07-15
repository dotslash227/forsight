import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import {RedditService} from '../../app/services/reddit.service';
import {NewsService} from '../../app/services/news.service';
import {DetailsPage} from '../details/details';


@Component({
  selector: 'news',
  templateUrl: 'news.html',
  // providers: [RedditService],
  providers: [NewsService],
})
export class NewsPage {
  items: any;
  category: any;
  limit: any;

  constructor(public navCtrl: NavController, private newsService: NewsService) {
    this.getDefault();
  }
  getDefault(){
    if(localStorage.getItem('category')!= null){
      this.category = localStorage.getItem('category');
    }
    else{
      this.category = 'sports';

    }
    if(localStorage.getItem('limit')!= null){
      this.limit = localStorage.getItem('limit');
    }
    else{
      this.limit = 10;
    }
  }

  ngOnInit(){
    console.log('onInit ran');
    this.getPosts(this.category, this.limit);
  }
  getPosts(category, limit){
    this.newsService.getPosts(category, limit).subscribe(response=>{
      console.log(response);
      this.items=response.data.children;

    });

  }
  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      'item': item,
    })
  }
  changeCategory(){
    this.getPosts(this.category, this.limit);

  }



}
