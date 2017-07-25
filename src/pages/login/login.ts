import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  baseUrl: string;
  username: string;
  password: string;
  errorMsg: string;
  constructor(public navCtrl: NavController, private http: Http, public storage: Storage,) {
    this.baseUrl = '/login/';
    this.errorMsg = null;
  }
  gotoSignup() {
    this.navCtrl.setRoot(SignupPage);

  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }
  setData(data, username, password){
    this.storage.set('username', username);
    this.storage.set('email', data.email);
    this.storage.set('password', password);

    this.storage.set('name', data.name);
    this.storage.set('age', Number(data.age));
    this.storage.set('phone', Number(data.phone));
    this.storage.set('address', data.address);
    this.storage.set('od', Number(data.od));
    this.storage.set('os', Number(data.os));
    this.storage.set('va', Number(data.va));
  }
  login() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl, { username: this.username, password: this.password }, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log("login data=>", data);
        if (data["error"] == false) {
          this.errorMsg = null;
          this.setData(data, this.username, this.password);
          this.navCtrl.setRoot(HomePage, {

          })
        }
        else {
          this.errorMsg = "Invalid username or password!!!";
        }
      }, error => {
        console.log(error);
      });
  }
}
