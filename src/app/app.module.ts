import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { DetailsPage } from '../pages/details/details';
import { UserPage } from '../pages/user/user';
import { EditUserPage } from '../pages/user/editUser';

import { SearchPage } from '../pages/search/search';
import { SearchResultPage } from '../pages/search/searchResult';

import { MapPage } from '../pages/map/map';

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocationsProvider } from '../providers/locations/locations';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';


import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import {OptometristService} from '../app/services/optometrist.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewsPage,
    DetailsPage,
    UserPage,
    EditUserPage,
    SearchPage,
    SearchResultPage,
    MapPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    NewsPage,
    DetailsPage,
    UserPage,
    EditUserPage,
    SearchPage,
    SearchResultPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationsProvider, GoogleMapsProvider, ConnectivityProvider,
    Network,
    OptometristService,

  ]
})
export class AppModule {}
