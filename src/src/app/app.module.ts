import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { DetailsPage } from '../pages/details/details';
import { UserPage } from '../pages/user/user';
import { EditUserPage } from '../pages/user/editUser';
import { OptometristPage } from '../pages/optometrist/optometrist';

import {FaceDetectionResultPage} from '../pages/face-detection-result/face-detection-result';
import {LensRecommenderPage} from '../pages/lens-recommender/lens-recommender';

import { SearchPage } from '../pages/search/search';
import { SearchBySpecPage } from '../pages/search/searchBySpec';

import { SearchResultPage } from '../pages/search/searchResult';

import { MapPage } from '../pages/map/map';
import { MapDirPage } from '../pages/map/mapDir';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { GoogleMapsDirProvider } from '../providers/google-maps/google-mapsDir';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';


import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import {OptometristService} from '../app/services/optometrist.service';


import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { PhotoUploadPage } from '../pages/photoUpload/photoUpload';

import {OptometristListPage} from '../pages/optometristList/optometristList';

import { DirectionsPage } from '../pages/directions/directions';
import { FilterPipe } from '../pages/search/search.pipe';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    NewsPage,
    DetailsPage,
    UserPage,
    EditUserPage,
    OptometristPage,
    SearchPage,
    SearchBySpecPage,
    SearchResultPage,
    PhotoUploadPage,
    MapPage,
    OptometristListPage,
    DirectionsPage,
    FaceDetectionResultPage,
    MapDirPage,
    FilterPipe,
    LensRecommenderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    NewsPage,
    DetailsPage,
    UserPage,
    EditUserPage,
    OptometristPage,
    SearchPage,
    SearchBySpecPage,
    SearchResultPage,
    MapPage,
    PhotoUploadPage,
    OptometristListPage,
    DirectionsPage,
    MapDirPage,
    FaceDetectionResultPage,
    LensRecommenderPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GoogleMapsProvider,
    GoogleMapsDirProvider,
    ConnectivityProvider,
    Network,
    OptometristService,
    Transfer, Camera,
    StatusBar,
    CallNumber,
    EmailComposer,
    LaunchNavigator,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
