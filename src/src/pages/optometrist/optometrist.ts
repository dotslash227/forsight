import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-optometrist',
  templateUrl: 'optometrist.html'
})
export class OptometristPage {
  name: string;
  age: number;
  phone: string;
  address: string;
  item: any;

  constructor(private launchNavigator: LaunchNavigator, private emailComposer: EmailComposer, private callNumber: CallNumber, public navCtrl: NavController, public params: NavParams){
    this.item =params.get('item');
    console.log("item.photo in maps.ts=", this.item.photo);
  }

  callIT(passedNumber){
    this.callNumber.callNumber(passedNumber, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  email(passedEmail){
    let email = {
      to: passedEmail,
      isHtml: true
    };
    this.emailComposer.open(email)
    .then(() => console.log('Launched Email!'))
    .catch(() => console.log('Error launching Email'));
  }
  navigate(location){
    this.launchNavigator.navigate(location);
  }


}
