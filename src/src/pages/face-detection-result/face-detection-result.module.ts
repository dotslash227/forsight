import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaceDetectionResultPage } from './face-detection-result';

@NgModule({
  declarations: [
    FaceDetectionResultPage,
  ],
  imports: [
    IonicPageModule.forChild(FaceDetectionResultPage),
  ],
  exports: [
    FaceDetectionResultPage
  ]
})
export class FaceDetectionResultPageModule {}
