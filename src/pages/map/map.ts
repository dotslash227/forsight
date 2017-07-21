import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationsProvider } from '../../providers/locations/locations';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { NavController, Platform } from 'ionic-angular';
import {OptometristService} from '../../app/services/optometrist.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [OptometristService],
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController,
              public maps: GoogleMapsProvider,
              public platform: Platform,
              public locations: LocationsProvider,
              private optometristService: OptometristService
            ) {

  }

  ionViewDidLoad(){

    this.platform.ready().then(() => {

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

    });
  }
  ngOnInit(){
    console.log('onInit ran');
    // this.getOptometrists();
  }

  getOptometrists(){
    this.optometristService.getOptometrists().subscribe(response=>{
      console.log("resp=", response);
      console.log("response.data.children=",response[0]["name"])
    });
  }

}
