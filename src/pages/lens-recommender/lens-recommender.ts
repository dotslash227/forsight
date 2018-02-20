import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LensRecommenderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lens-recommender',
  templateUrl: 'lens-recommender.html',
})
export class LensRecommenderPage {
  public ROOT_URL = 'https://vision.googleapis.com';
    public API_KEY = 'AIzaSyBwzIlJsFclNrSOhlneKqkM2km4NgBvxFc'; // YOUR CLOUD PLATFORM API KEY
    public visionRequest = {
      "requests": [{
          "image": {
            "content": ""
          },
          "features": [{
              "type": "IMAGE_PROPERTIES",
              "maxResults": 10
          }]
      }]
    };
    public dominantColors: number;
    public recommendedLens: string;

    public imageResult = 'https://i.imgur.com/hyRulHk.gif';

  constructor(public http: HttpClient,
  public camera: Camera,
  public loadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LensRecommenderPage');
  }

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
          const imagePropertiesAnnotations = result.imagePropertiesAnnotation.dominantColors.colors[0];
          this.presentToast('Image successfully processed.');
          this.dominantColors= imagePropertiesAnnotations.color.red;
          if(this.dominantColors < 110)
            {
              this.recommendedLens='assets/img/rbw80to110.png';
            }
          else if( this.dominantColors > 110 && this.dominantColors < 180 )
            {
              this.recommendedLens='assets/img/rbw100to180.png';
            }
          else
            {
              this.recommendedLens='assets/img/rgt180.png';
            }
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

        this.dominantColors= null;


    this.imageResult = 'https://i.imgur.com/hyRulHk.gif';
  }

}
