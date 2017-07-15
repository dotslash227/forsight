import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewsPage} from '../news/news';
import {UserPage} from '../user/user';
import {SearchPage} from '../search/search';

import {MapPage} from '../map/map';

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
    this.navCtrl.push(MapPage)
  }
  searchOpto(){
    this.navCtrl.push(SearchPage)
  }

}
