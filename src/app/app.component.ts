import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { SearchPage } from '../pages/search/search';
import { MapPage } from '../pages/map/map';
import { UserPage } from '../pages/user/user';
import { OptometristPage } from '../pages/optometrist/optometrist';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {Http, URLSearchParams, RequestOptions, Headers} from '@angular/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private http: Http) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'md-home',  },
      { title: 'News', component: NewsPage, icon: 'md-list-box', },
      { title: 'Search', component: SearchPage, icon: 'ios-search-outline',  },
      { title: 'NearMe', component: MapPage, icon: 'ios-locate-outline',  },
      { title: 'Profile', component: UserPage, icon: 'md-person',  },
      { title: 'Logout', component: LoginPage, icon: 'md-log-out',  },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component == LoginPage){
      console.log("logout called");
      return this.http.get('/logout')
        .map(res => res.json())
        .subscribe(data => {
          console.log("logout data=>", data);
          this.nav.setRoot(page.component);
        }, error => {
          console.log(error);
        });
    }
  }
}
