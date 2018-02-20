import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Data} from '../../app/services/data.service';

@Component({
  selector: 'searchResult',
  templateUrl: 'searchResult.html',
  providers: [Data],
})
export class SearchResultPage {
  searchTerm: string = '';
  item: any;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.item =params.get('item');
  }

}
