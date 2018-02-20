import { Component } from '@angular/core';
import {OptometristPage} from '../optometrist/optometrist';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'optometristList',
  templateUrl: 'optometristList.html'
})

export class OptometristListPage {

  optometrists: any;

  constructor(public navCtrl: NavController, public params: NavParams){
    this.optometrists = params.get('optometrists');
    console.log("this.optometrists in list=", this.optometrists);
  }

  select(item) {
    this.navCtrl.push(OptometristPage, {
      'item': item,
    })
  }

}
