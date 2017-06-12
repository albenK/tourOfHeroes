import { Component } from '@angular/core';
import {Hero} from "./Hero";
import {HeroService} from "./hero.service";
import {OnInit} from "@angular/core";

@Component
({
  moduleId: module.id,
  selector:"heroes-dashboard",
  templateUrl:"./dashboard.component.html"
})

export class DashboardComponent implements OnInit
{
  private topHeroes:Hero[];//local variable. We assign this a value once getTopHeroes()
  //is invoked..
  constructor(private heroService:HeroService)
  {
    // console.log("we are now in the dashboard component");
  }

  ngOnInit():void
  {
    this.getTopHeroes();
    // console.log("we grabbed our top heroes from mock-heroes file.");
  }

  getTopHeroes():void // get heroes from database and assign a couple of heroes to our topHeroes array.
  {
    this.heroService.getHeroesFromDatabase().
    subscribe((heroesFromDatabase:Hero[]) => this.topHeroes = heroesFromDatabase.slice(1,5));
  }
}
