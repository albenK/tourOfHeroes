//import necessary modules...
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//import necessary Services...
import {HeroService} from "./hero.service";
import {UserAuthenticationService} from "./services/user.service";

//import necessary components...
import {AppComponent} from './app.component';
import {UserSignUpComponent} from "./userAuthentication/userSignUp.component";
import {UserSignInComponent} from "./userAuthentication/userSignIn.component";
import {HeroesComponent} from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {DashboardComponent} from "./dashboard.component";
import {PageNotFoundComponent} from "./pageNotFound.component";

//import firebase config
import {environment} from "../environments/environment";

@NgModule({
  declarations:
  [
    AppComponent,
    UserSignUpComponent,
    UserSignInComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [UserAuthenticationService,HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
