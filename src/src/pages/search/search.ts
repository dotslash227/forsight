import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OptometristService} from '../../app/services/optometrist.service';
import {OptometristPage} from '../optometrist/optometrist';


@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {

  searchTerm: string = '';
  items: any;

  constructor(public navCtrl: NavController,public optometristService: OptometristService) {

  }
  ionViewDidLoad() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    if (this.searchTerm != ""){
        this.items = this.optometristService.filterItemsByName(this.searchTerm);
    }
    else{
      this.items=null;
    }

  }
  search(item){
    this.navCtrl.push(OptometristPage, {
      'item': item,
    })
  }

}
