import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@Component({
  selector: 'page-photoUpload',
  templateUrl: 'photoUpload.html'
})
export class PhotoUploadPage {
  baseUrl: string;
  photo: any;
  errorMsg: string;

  constructor(public navCtrl: NavController, private http: Http, private transfer: Transfer, private camera: Camera) {
    this.baseUrl = 'http://oapp.delhinerds.com/photoUpload/';
    this.errorMsg = null;
  }
  upload() {
    let options = {
      quality: 100
    };
    this.camera.getPicture(options).then((imageData) => {
      const fileTransfer: TransferObject = this.transfer.create();
      let options1: FileUploadOptions = {
        fileKey: 'photo',
        fileName: 'name.jpg',
        headers: {}
      }
      fileTransfer.upload(imageData,
        //  'http://localhost/ionic/upload.php',
        this.baseUrl,
        options1)
        .then((data) => {
          // success
          console.log("data=", data);
          alert("success");
        }, (err) => {
          // error
          alert("error" + JSON.stringify(err));
        });
    });
  }
}



// pickPicture() {
//   Camera.getPicture({
//     destinationType: Camera.DestinationType.DATA_URL,
//     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//     mediaType: Camera.MediaType.PICTURE
//   }).then((imageData) => {
//     // imageData is a base64 encoded string
//     this.photo = "data:image/jpeg;base64," + imageData;
//     console.log("image=",this.photo );
//   }, (err) => {
//     console.log(err);
//   });
// }
