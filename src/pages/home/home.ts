import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewsPage} from '../news/news';
import {UserPage} from '../user/user';
import {SearchPage} from '../search/search';
import {SearchBySpecPage} from '../search/searchBySpec';
import {MapPage} from '../map/map';
import {FaceDetectionResultPage} from '../face-detection-result/face-detection-result';
import {LensRecommenderPage} from '../lens-recommender/lens-recommender';
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
  searchOptoByName(){
    this.navCtrl.push(SearchPage)
  }
  searchOptoBySpec(){
    this.navCtrl.push(SearchBySpecPage)
  }
  detectFace(){
    this.navCtrl.push(FaceDetectionResultPage)
  }
recommendLens(){
this.navCtrl.push(LensRecommenderPage)
}

}
