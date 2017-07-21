import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-optometrist',
  templateUrl: 'optometrist.html'
})
export class OptometristPage {
  name: string;
  age: number;
  phone: string;
  address: string;

  constructor(public navCtrl: NavController) {

  }

}
