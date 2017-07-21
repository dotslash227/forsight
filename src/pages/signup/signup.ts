import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Http, URLSearchParams} from '@angular/http';
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
  name: string;
  age: number;
  phone: string;
  address: string;
  od: number;
  os: number;
  va: number;

  constructor(public navCtrl: NavController, private http: Http) {
    this.baseUrl = '/signup';
  }
  isValidUsername() {
    return false;
  }
  isValidPassword() {
    return true;
  }
  gotoLogin() {
    this.navCtrl.push(LoginPage, {
    })
  }
  signup() {

    let data = new URLSearchParams();
    data.append('username', this.username);
    data.append('password', this.password);
    data.append('name', this.name);
    data.append('age', String(this.age));
    data.append('phone', this.phone);
    data.append('address', this.address);
    data.append('os', String(this.os));
    data.append('od', String(this.od));
    data.append('va', String(this.va));


    return this.http.post(this.baseUrl, data)
      .map(res => res.json())
      .subscribe(data => {
        console.log("signup data=>", data);
      }, error => {
        console.log("error=", error.json());
      });
  }


}
