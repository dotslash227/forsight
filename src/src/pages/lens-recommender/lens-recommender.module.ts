import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LensRecommenderPage } from './lens-recommender';

@NgModule({
  declarations: [
    LensRecommenderPage,
  ],
  imports: [
    IonicPageModule.forChild(LensRecommenderPage),
  ],
  exports: [
    LensRecommenderPage
  ]
})
export class LensRecommenderPageModule {}
