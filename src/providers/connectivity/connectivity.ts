import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityProvider {

  onDevice: boolean;

  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

}
