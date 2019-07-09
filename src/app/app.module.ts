import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD8LILrw6fBRCnC6DLuO_SqKeGAxZVB-Ts",
      authDomain: "gpkportable.firebaseapp.com",
      databaseURL: "https://gpkportable.firebaseio.com",
      projectId: "gpkportable",
      storageBucket: "gpkportable.appspot.com",
      messagingSenderId: "678077580167",
      appId: "1:678077580167:web:11b92a31cccf6002"
    }),
      AngularFireDatabaseModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
