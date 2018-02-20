import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'face-detection-result.html'
})
export class FaceDetectionResultPage {

  public ROOT_URL = 'https://vision.googleapis.com';
    public API_KEY = 'AIzaSyBwzIlJsFclNrSOhlneKqkM2km4NgBvxFc'; // YOUR CLOUD PLATFORM API KEY
    public visionRequest = {
      "requests": [{
          "image": {
            "content": ""
          },
          "features": [{
              "type": "FACE_DETECTION",
              "maxResults": 10
          }]
      }]
    };
    public visionResult = {
      angerLikelihood: null,
      blurredLikelihood: null,
      headwearLikelihood: null,
      joyLikelihood: null,
      sorrowLikelihood: null,
      surpriseLikelihood: null,
      underExposedLikelihood: null,
      detectionConfidence: null,

    };
    public imageResult = 'https://i.imgur.com/hyRulHk.gif';

  constructor(
    public http: HttpClient,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {}

  capture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present(); // show loading component

    this.camera.getPicture(options).then((imageData) => {
      this.visionRequest.requests[0].image.content = imageData;
      this.imageResult = 'data:image/jpeg;base64,' + imageData;
      this.http.post(`${this.ROOT_URL}/v1/images:annotate?key=${this.API_KEY}`, this.visionRequest)
      .subscribe((data: any) => {
        loader.dismiss(); // hide loading component
        var result = data.responses[0];
        if(Object.keys(result).length === 0) {
          this.reset();
          this.presentToast('Error processing image.');
        } else {
          const faceAnnotations = result.faceAnnotations[0];
          // const imagePropertiesAnnotations = result.imagePropertiesAnnotation.dominantColors.colors[0];
          this.presentToast('Image successfully processed.');
          this.visionResult = {
            angerLikelihood: faceAnnotations.angerLikelihood,
            blurredLikelihood: faceAnnotations.blurredLikelihood,
            headwearLikelihood: faceAnnotations.headwearLikelihood,
            joyLikelihood: faceAnnotations.joyLikelihood,
            sorrowLikelihood: faceAnnotations.sorrowLikelihood,
            surpriseLikelihood: faceAnnotations.surpriseLikelihood,
            underExposedLikelihood: faceAnnotations.underExposedLikelihood,
            detectionConfidence: faceAnnotations.detectionConfidence,

          };
        }
      }, (err) => {
        loader.dismiss(); // hide loading component
        this.reset();
        this.showAlert('Vision API Request Error.');
        console.log("error occured");
      })
    }, (err) => {
      loader.dismiss(); // hide loading component
      this.reset();
      this.showAlert('Camera Error Occured.');
      console.log(err);
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Ionic Vision',
      subTitle: message,
      buttons: ['OK'],
      cssClass: 'alertDanger'
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  reset() {
    this.visionResult = {
      angerLikelihood: null,
      blurredLikelihood: null,
      headwearLikelihood: null,
      joyLikelihood: null,
      sorrowLikelihood: null,
      surpriseLikelihood: null,
      underExposedLikelihood: null,
      detectionConfidence: null,

    };
    this.imageResult = 'https://i.imgur.com/hyRulHk.gif';
  }
}
