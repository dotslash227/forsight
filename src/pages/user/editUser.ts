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
  od: number;
  os: number;
  va: number;

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
    this.storage.set('od', '1.1');
    this.storage.set('os', '1.2');
    this.storage.set('va', '1.0');

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
        od: this.od,
        os: this.os,
        va: this.va
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
          this.storage.set('od', this.od);
          this.storage.set('os', this.os);
          this.storage.set('va', this.va);
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
    this.storage.get('od').then((val) => {
      if (val == null) {
        return false;
      }
      this.od = val;
    });
    this.storage.get('os').then((val) => {
      if (val == null) {
        return false;
      }
      this.os = val;
    });
    this.storage.get('va').then((val) => {
      if (val == null) {
        return false;
      }
      this.va = val;
    });
    return true;
  }




}
