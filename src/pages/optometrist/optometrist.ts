import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-optometrist',
  templateUrl: 'optometrist.html'
})
export class OptometristPage {
  name: string;
  age: number;
  phone: string;
  address: string;
  item: any;
  
  constructor(public navCtrl: NavController, public params: NavParams){
    this.item =params.get('item');
  }

}
