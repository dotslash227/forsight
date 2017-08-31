import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OptometristService} from '../../app/services/optometrist.service';
import {OptometristListPage} from '../optometristList/optometristList';

@Component({
  selector: 'searchSpec',
  templateUrl: 'searchBySpec.html'
})


export class SearchBySpecPage {

  searchTerm: string = '';
  items: any;
  optometrists: any;

  constructor(public navCtrl: NavController, public optometristService: OptometristService) {
    this.getSpecialisations();
  }

  ionViewDidLoad() {
    // this.setFilteredItems();

  }
  getSpecialisations() {
    this.optometristService
      .getSpecialisationInit()
      .subscribe(data => {
        this.items = data;
        // return data;
        console.log("items in search=", this.items);
      });

  }
  setFilteredItems() {
    this.items = this.optometristService.filterItemsByName(this.searchTerm);
  }

  select(item) {
    this.optometrists = this.optometristService.filterItemsBySpec(item);
    this.navCtrl.push(OptometristListPage, {
      'optometrists': this.optometrists,
    })
  }

}
