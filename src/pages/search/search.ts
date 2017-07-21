import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Data} from '../../app/services/data.service';
import {OptometristService} from '../../app/services/optometrist.service';
import {SearchResultPage} from './searchResult';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [Data],
})
export class SearchPage {

  searchTerm: string = '';
  items: any;

  constructor(public navCtrl: NavController, public dataService: Data, public optometristService: OptometristService) {

  }
  ionViewDidLoad() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    if (this.searchTerm != ""){
        // this.items = this.dataService.filterItems(this.searchTerm);
        this.items = this.optometristService.filterItems(this.searchTerm);
    }
    else{
      this.items=null;
    }

  }
  search(item){
    this.navCtrl.push(SearchResultPage, {
      'item': item,
    })
  }

}
