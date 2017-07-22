import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Http, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import {HomePage} from '../home/home';
import {Camera} from 'ionic-native';

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
  od: number;
  os: number;
  va: number;
  photo:any;
  errorMsg: string;


  constructor(public navCtrl: NavController, private http: Http) {
    this.baseUrl = '/signup';
    this.errorMsg = null;
  }
  isValidUsername() {
    return false;
  }
  isValidPassword() {
    return false;
  }
  gotoLogin() {
    this.navCtrl.push(LoginPage, {
    })
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }
  pickPicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: Camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.photo = "data:image/jpeg;base64," + imageData;
      console.log("image=",this.photo );
    }, (err) => {
      console.log(err);
    });
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
        od: this.od,
        os: this.os,
        va: this.va,
        photo: this.photo,
      }, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log("signup data=>", data);
        if (data["error"] == false) {
          this.errorMsg = data["msg"];
          this.navCtrl.setRoot(HomePage, {
            'username': this.username,
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
