import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
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

  constructor(public navCtrl: NavController) {

  }
  isValidUsername(){
    return false;
  }
  isValidPassword(){
    return true;
  }


}
