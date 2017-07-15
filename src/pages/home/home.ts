import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewsPage} from '../news/news';
import {UserPage} from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }
  news(){
    this.navCtrl.push(NewsPage, {
    })
  }
  profile(){
    this.navCtrl.push(UserPage)
  }
  nearMe(){
    this.navCtrl.push(UserPage)
  }
  searchOpto(){
    this.navCtrl.push(UserPage)
  }

}
