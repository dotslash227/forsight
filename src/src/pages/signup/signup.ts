import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  baseUrl: string;
  username: string;
  password: string;
  repassword: string;
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
  errorMsg: string;


  constructor(public navCtrl: NavController, private http: Http) {
    this.baseUrl = 'http://oapp.delhinerds.com/signup/';
    this.errorMsg = null;
  }
  isValidUsername() {
    return true;
  }
  isValidPassword() {
    return false;
  }
  gotoLogin() {
    this.navCtrl.setRoot(LoginPage)
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  signup() {
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
        // console.log("signup data=>", data);
        if (data["error"] == false) {
          this.errorMsg = data["msg"];
          this.navCtrl.setRoot(LoginPage, {
          })
        }
        else {
          this.errorMsg = data["msg"];
        }
      }, error => {
        console.log(error);
      });
  }
}
