import { Component} from '@angular/core';
import {Hero} from "./Hero";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {OnInit} from "@angular/core";
import {HeroService} from "./hero.service";
import "rxjs/add/operator/switchMap";
@Component
({
  selector: "hero-detail",
  templateUrl:"./hero-detail.component.html"

})

export class HeroDetailComponent implements OnInit
{
  private theHero:any; //local variable. We assign this a value once getHero()
  //is invoked..
  private feedbackMessage:string; //local variable for user notification. Just to check if
  // the users input value was successfully updated or not.
  constructor
  (private theActivatedRoute:ActivatedRoute, private heroService:HeroService,
  private location:Location)
  {
    this.feedbackMessage = "";
    // console.log("we are now in the hero detail component");
  }

  ngOnInit():void
  {
    this.getHero();
  }

  getHero():void
  {
    this.theActivatedRoute.params.
    switchMap((params:Params)=>
    {
      let id = params["id"];
      return this.heroService.getHeroFromDatabaseById(id)
    }).
    subscribe((theReturnedHero:Hero) => this.theHero = theReturnedHero);
    // console.log("we now have gotten the hero with the specified id.");
  }

  inputValueIsInvalid():boolean //method to check if user input is invalid..
  {
    return this.theHero.name === ""; // maybe use regular expressions??
  }

  updateNameOfHero():void
  {
    if(this.inputValueIsInvalid()) //just double check...
    {
      this.feedbackMessage = "Please type in a valid name!";
      return;
    }
    this.heroService.updateNameOfHeroInDatabase(this.theHero.$key, this.theHero.name).
    then((feedback) => this.feedbackMessage = feedback);
  }

  goBack():void // go back in the browsers history stack..
  {
    this.location.back();
  }

}
