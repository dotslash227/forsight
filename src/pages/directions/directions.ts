import { Component } from '@angular/core';
import { MapDirPage } from '../map/mapDir';
import { ListPage } from '../list/list';
import { NavController,  NavParams } from 'ionic-angular';

@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html'
})
export class DirectionsPage {
  list: any;

  tab1Root: any = MapDirPage;
  tab2Root: any = ListPage;

  optometrist: any;
  lon: number;
  lat: number
  data: any;
  constructor(params: NavParams){
      this.optometrist = params.get('item');
      this.lon = params.get('lon');
      this.lat = params.get('lat');
      this.data = {"optometrist": this.optometrist, "userLon": this.lon, "userLat": this.lat};
      // console.log("data in directions.ts=", this.data);

  }

}
