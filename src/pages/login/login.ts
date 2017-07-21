import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  baseUrl: string;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, private http: Http) {
    this.baseUrl = '/login';
  }
  gotoSignup() {
    this.navCtrl.push(SignupPage, {
    })
  }

  login() {

    let data = new URLSearchParams();
    data.append('username', this.username);
    data.append('password', this.password);

    return this.http.post(this.baseUrl, data)
      .map(res => res.json())
      .subscribe(data => {
        console.log("login data=>", data);
      }, error => {
        console.log(error);
      });
  }
}
