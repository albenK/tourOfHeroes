import { Component } from '@angular/core';
import {Hero} from "./Hero";
import {HeroService} from "./hero.service";
import {OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component
({
  moduleId: module.id,
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./app.component.css']
})


export class HeroesComponent implements OnInit
{

  private ourHeroes:Hero[]; //local array that will hold all of the heroes from database. We assign this a value
  //in the getHeroes() method call..
  private newHeroName:string;// local variable that holds the new hero name that user wants to add.
  private feedbackMessage:string;// feedback after doing database operations..
  private userWantsToDelete:boolean;
  private usersOptionForMenu:string;
  constructor(private heroService:HeroService, private router:Router,
  private iconRegistry: MdIconRegistry, private sanitizer: DomSanitizer)
  {
    this.newHeroName = "";
    this.feedbackMessage = "";
    this.userWantsToDelete = false;
    this.usersOptionForMenu = "Delete";
    iconRegistry.addSvgIcon("delete",
    sanitizer.bypassSecurityTrustResourceUrl("../assets/delete.svg"));
  }

  ngOnInit():void
  {
    this.getHeroes();
  }

  getHeroes():void //get all heroes from our database and assign returned data to ourHeroes array.
  {
    this.heroService.getHeroesFromDatabase().
    subscribe((heroesFromDatabase:Hero[]) => this.ourHeroes = heroesFromDatabase);
  }

  toggleMenuOptions()
  {
    this.userWantsToDelete = !this.userWantsToDelete; //negate the value..
    this.usersOptionForMenu = "Delete";
    if(this.userWantsToDelete)// if this is true, then user option should be cancel..
    {
      this.usersOptionForMenu = "Cancel";
    }

  }

  userInputIsInvalid():boolean
  {
    return this.newHeroName == "";
  }

  addNewHero():void
  {
    this.heroService.addNewHeroToDatabase(this.newHeroName).
    then((feedback:string) => this.feedbackMessage = feedback);
    this.newHeroName = ""; // re-assign empty string to variable, so that user can type immediately..
  }

  goToHeroDetail(heroThatUserSelected)// method that will be invoked once user clicks a hero in the view.
  {
    this.router.navigate(["/heroDetail",heroThatUserSelected.$key]);
  }

  deleteHero(hero)
  {
    this.heroService.deleteHeroFromDatabase(hero).
    then((feedback:string) => this.feedbackMessage = feedback);
  }

  deleteAllHeroes()
  {
    this.heroService.deleteAllHeroesFromDatabase().
    then((feedback:string) => this.feedbackMessage = feedback);
  }

}
