import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Locations } from '../../providers/locations/locations';
import { GoogleMapsDirProvider } from '../../providers/google-maps/google-mapsDir';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
   selector: 'page-list',
   templateUrl: 'list.html'
 })
 export class ListPage {
   directions: any = []

   constructor(public navCtrl: NavController,  public maps: GoogleMapsDirProvider) {

   }


 }
