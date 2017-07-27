import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OptometristService} from '../../app/services/optometrist.service';
import {OptometristPage} from '../optometrist/optometrist';


@Component({
  selector: 'searchSpec',
  templateUrl: 'searchBySpec1.html'
})

export class SearchBySpec1Page {

  searchTerm: string = '';
  items: any;

  constructor(public navCtrl: NavController,public optometristService: OptometristService) {

  }
  ionViewDidLoad() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    if (this.searchTerm != ""){
        this.items = this.optometristService.filterItemsBySpec(this.searchTerm);
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
