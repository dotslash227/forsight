import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsDirProvider } from '../../providers/google-maps/google-mapsDir';
import { NavController, Platform, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mapDir',
  templateUrl: 'mapDir.html'
})
export class MapDirPage {


  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  optometrist: any;
  userLon: number;
  userLat: number;
  optoLon: number;
  optoLat: number;

  data: any;
  constructor(public navCtrl: NavController, public maps: GoogleMapsDirProvider, public platform: Platform,  public params: NavParams) {
    this.data = params.data;
    console.log("data in mapDir.ts = ", this.data);
    // this.userLon = this.data["userLon"];
    // this.userLat = this.data["userLat"];
    // this.optoLon = this.data["optometrist"]["lon"];
    // this.optoLat = this.data["optometrist"]["lat"];
  }

  ionViewDidLoad() {


    this.platform.ready().then(() => {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.userLon, this.userLat, this.optoLon, this.optoLat);

      Promise.all([
        mapLoaded,

      ]).then((result) => {


        // for (let location of locations) {
        //   this.maps.addMarker(location.latitude, location.longitude);
        // }
         console.log("directions=",result[0]["directions"] )
      });

    });

  }

}
