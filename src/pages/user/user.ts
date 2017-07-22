import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {EditUserPage} from './editUser';
import {HomePage} from '../home/home';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  name: string;
  age: number;
  phone: string;
  address: string;
  od: number;
  os: number;
  va: number;

  constructor(public navCtrl: NavController, private storage: Storage, private location: PlatformLocation) {
    this.getData();
  }
  ngOnInit() {
    console.log("here in user");
    if(this.getData() == false){
      // this.setInitData();
    }
  }
  setInitData(){
    console.log("set init data");
    this.storage.set('name', 'Arjun Gupta');
    this.storage.set('age', '21');
    this.storage.set('phone', '8860303743');
    this.storage.set('address', '91springboard, Sector-1,Noida');
    this.storage.set('od', '1.1');
    this.storage.set('os', '1.2');
    this.storage.set('va', '1.0');
  }

  getData():boolean{
    this.storage.get('name').then((val) => {
      if(val==null){
        return false;
      }
      this.name = val;
    });
    this.storage.get('age').then((val) => {
      if(val==null){
        return false;
      }
      this.age = val;
    });
    this.storage.get('phone').then((val) => {
      if(val==null){
        return false;
      }
      this.phone = val;
    });
    this.storage.get('address').then((val) => {
      if(val==null){
        return false;
      }
      this.address = val;
    });
    this.storage.get('od').then((val) => {
      if(val==null){
        return false;
      }
      this.od = val;
    });
    this.storage.get('os').then((val) => {
      if(val==null){
        return false;
      }
      this.os = val;
    });
    this.storage.get('va').then((val) => {
      if(val==null){
        return false;
      }
      this.va = val;
    });
    return true;
  }

  editUser(){
    this.navCtrl.push(EditUserPage, {
    })
  }


}
