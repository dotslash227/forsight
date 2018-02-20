import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse} from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  baseUrl: string;
  username: string;
  password: string;
  errorMsg: string;
  constructor(public navCtrl: NavController, private http: Http, public storage: Storage, private fb: Facebook) {
    this.baseUrl = 'http://oapp.delhinerds.com/login/';
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
  setData(data, username, password) {
    this.storage.set('username', username);
    this.storage.set('email', data.email);
    this.storage.set('password', password);

    this.storage.set('name', data.name);
    this.storage.set('age', Number(data.age));
    this.storage.set('phone', Number(data.phone));
    this.storage.set('address', data.address);
    this.storage.set('od_sph', Number(data.od_sph));
    this.storage.set('od_cyl', Number(data.od_cyl));
    this.storage.set('od_axis', Number(data.od_va));
    this.storage.set('od_va', Number(data.od_va));
    this.storage.set('os_sph', Number(data.os_sph));
    this.storage.set('os_cyl', Number(data.os_cyl));
    this.storage.set('os_axis', Number(data.os_va));
    this.storage.set('os_va', Number(data.os_va));
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
  fblogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }
}
