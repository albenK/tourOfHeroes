//import necessary modules..
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

//import necessary components..
import {UserSignUpComponent} from "./userAuthentication/userSignUp.component";
import {UserSignInComponent} from "./userAuthentication/userSignIn.component";
import {HeroesComponent} from "./heroes.component";
import {DashboardComponent} from "./dashboard.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {PageNotFoundComponent} from "./pageNotFound.component";

/*
  NOTES: This is the app routing module. This module takes care of all of the
  routing operations of our app. We import this class in the app.module.ts file
*/
const appRoutes:Routes =
[

  {path:"", redirectTo:"/signIn", pathMatch:"full"},
  {path:"signIn", component:UserSignInComponent},
  {path:"signUp", component:UserSignUpComponent},
  {path:"heroes", component:HeroesComponent},
  {path:"heroDetail/:id",component:HeroDetailComponent},
  {path:"**",redirectTo:"/404"},
  {path:"404",component:PageNotFoundComponent}

];

@NgModule
({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
