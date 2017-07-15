import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Data} from '../../app/services/data.service';


@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [Data],
})
export class SearchPage {

  searchTerm: string = '';
  items: any;

  constructor(public navCtrl: NavController, public dataService: Data) {

  }
  ionViewDidLoad() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    if (this.searchTerm != ""){
        this.items = this.dataService.filterItems(this.searchTerm);
    }
    else{
      this.items=null;
    }

  }



}
