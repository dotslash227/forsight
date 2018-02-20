import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home';
import {Http, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'page-editUser',
  templateUrl: 'editUser.html'
})
export class EditUserPage {
  username: string;
  password: string;
  email: string;
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

  baseUrl: string;


  errorMsg: string;

  constructor(public navCtrl: NavController, private storage: Storage, public http: Http) {
    this.baseUrl = 'http://oapp.delhinerds.com/editUser/';
    this.getData();
    this.errorMsg = null;
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  setInitData() {

    // console.log("set init data");
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

  setData() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl,
      {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.name,
        age: this.age,
        phone: this.phone,
        address: this.address,
        od_sph: this.od_sph,
        od_cyl: this.od_cyl,
        od_axis: this.od_axis,
        od_va: this.od_va,
        os_sph: this.os_sph,
        os_cyl: this.os_cyl,
        os_axis: this.os_axis,
        os_va: this.os_va,
      }, options)
      .map(res => res.json())
      .subscribe(data => {
        // console.log("userEdit data=>", data);
        if (data["error"] == false) {

          this.errorMsg = data["msg"];
          this.storage.set('name', this.name);
          this.storage.set('age', this.age);
          this.storage.set('phone', this.phone);
          this.storage.set('address', this.address);
          this.storage.set('od_sph', this.od_sph);
          this.storage.set('od_cyl', this.od_cyl);
          this.storage.set('od_va', this.od_va);
          this.storage.set('od_axis', this.od_axis);
          this.storage.set('os_sph', this.os_sph);
          this.storage.set('os_cyl', this.os_cyl);
          this.storage.set('os_va', this.os_va);
          this.storage.set('os_axis', this.os_axis);
          this.navCtrl.setRoot(HomePage);
        }
        else {
          this.errorMsg = data["msg"];
        }
      }, error => {
        console.log(error);
      });


  }

  getData(): boolean {
    // console.log("get data called of editUser");
    this.storage.get('username').then((val) => {
      if (val == null) {
        return false;
      }
      this.username = val;
    });
    this.storage.get('password').then((val) => {
      if (val == null) {
        return false;
      }
      this.password = val;
    });
    this.storage.get('email').then((val) => {
      if (val == null) {
        return false;
      }
      this.email = val;
    });
    this.storage.get('name').then((val) => {
      if (val == null) {
        return false;
      }
      this.name = val;
    });
    this.storage.get('age').then((val) => {
      if (val == null) {
        return false;
      }
      this.age = val;
    });
    this.storage.get('phone').then((val) => {
      if (val == null) {
        return false;
      }
      this.phone = val;
    });
    this.storage.get('address').then((val) => {
      if (val == null) {
        return false;
      }
      this.address = val;
    });
    this.storage.get('od_sph').then((val) => {
      if (val == null) {
        return false;
      }
      this.od_sph = val;
    });
    this.storage.get('od_cyl').then((val) => {
      if (val == null) {
        return false;
      }
      this.od_cyl = val;
    });
    this.storage.get('od_axis').then((val) => {
      if (val == null) {
        return false;
      }
      this.od_axis = val;
    });
    this.storage.get('od_va').then((val) => {
      if (val == null) {
        return false;
      }
      this.od_va = val;
    });
    this.storage.get('os_sph').then((val) => {
      if (val == null) {
        return false;
      }
      this.os_sph = val;
    });
    this.storage.get('os_cyl').then((val) => {
      if (val == null) {
        return false;
      }
      this.os_cyl = val;
    });
    this.storage.get('os_axis').then((val) => {
      if (val == null) {
        return false;
      }
      this.os_axis = val;
    });
    this.storage.get('os_va').then((val) => {
      if (val == null) {
        return false;
      }
      this.os_va = val;
    });
    return true;
  }




}
