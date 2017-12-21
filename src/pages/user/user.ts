import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {EditUserPage} from './editUser';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  name: string;
  age: number;
  phone: string;
  address: string;
  od_sph: number;
  od_cyl: number;
  od_axis: number;
  od_va: string;
  os_sph: number;
  os_cyl: number;
  os_axis: number;
  os_va: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.getData();
  }
  ngOnInit() {
    if(this.getData() == false){
      // this.setInitData();
    }
  }
  setInitData(){
    this.storage.set('name', 'Arjun Gupta');
    this.storage.set('age', '21');
    this.storage.set('phone', '8860303743');
    this.storage.set('address', '91springboard, Sector-1,Noida');
    this.storage.set('od_sph', '2.0');
    this.storage.set('od_cyl', '0');
    this.storage.set('od_axis', '180');
    this.storage.set('od_va', '6/6');
    this.storage.set('os_sph', '2.0');
    this.storage.set('os_cyl', '0');
    this.storage.set('os_axis', '180');
    this.storage.set('os_va', '6/6');
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
    this.storage.get('od_sph').then((val) => {
      if(val==null){
        return false;
      }
      this.od_sph = val;
    });
    this.storage.get('od_cyl').then((val) => {
      if(val==null){
        return false;
      }
      this.od_cyl = val;
    });
    this.storage.get('od_va').then((val) => {
      if(val==null){
        return false;
      }
      this.od_va = val;
    });
    this.storage.get('od_axis').then((val) => {
      if(val==null){
        return false;
      }
      this.od_axis = val;
    });
    this.storage.get('os_sph').then((val) => {
      if(val==null){
        return false;
      }
      this.os_sph = val;
    });
    this.storage.get('os_cyl').then((val) => {
      if(val==null){
        return false;
      }
      this.os_cyl = val;
    });
    this.storage.get('os_va').then((val) => {
      if(val==null){
        return false;
      }
      this.os_va = val;
    });
    this.storage.get('os_axis').then((val) => {
      if(val==null){
        return false;
      }
      this.os_axis = val;
    });
    return true;
  }

  editUser(){
    this.navCtrl.push(EditUserPage, {
    })
  }


}
