import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import {Http, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HomePage} from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  baseUrl: string;
  username: string;
  password: string;
  errorMsg: string;
  constructor(public navCtrl: NavController, private http: Http) {
    this.baseUrl = '/login';
    this.errorMsg = null;
  }
  gotoSignup() {
    this.navCtrl.push(SignupPage, {
    })
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
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
          this.navCtrl.push(HomePage, {
            'username': this.username,
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
