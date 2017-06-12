import {Injectable} from "@angular/core";
import {Hero} from "./Hero";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import * as firebase from "firebase/app";
import {Observable} from "rxjs/Observable";

/*
  NOTES:
  The purpose of this class is to provide a service that allows us to communicate with our
  firebase database. We have important methods such as getHeroesFromDatabase(),
  getHeroFromDatabaseById(), and updateNameOfHeroInDatabase(). getHeroesFromDatabase() is invoked in the DashboardComponent and HeroesComponent.
  getHeroFromDatabaseById() is invoked in the HeroDetailComponent. updateNameOfHeroInDatabase() is invoked
  in the HeroDetailComponent.
-------------------------------------------------------------------------
 */
@Injectable()
export class HeroService
{
  private collectionName:string; //local variable that references the firebase table
  constructor(private firebaseDb:AngularFireDatabase)
  {
    this.collectionName = "/Heroes";
  }

  getHeroesFromDatabase():Observable<Hero[]> //this method returns an Observale<Hero[]> to which we can subscribe to later.
  {
    return this.firebaseDb.list(this.collectionName).
    map((theListOfHeroes:Hero[]) => {return theListOfHeroes as Hero[]});
  }

  getHeroFromDatabaseById(theId:string):Observable<Hero> //this method returns an Observale<Hero> to which we can subscribe to later.
  {
    return this.firebaseDb.list(this.collectionName,
    {
      query:{orderByKey:true,limitToFirst:1,equalTo:theId} //we treat the key as the id..
    }).
    map((theHeroThatMatchesTheId:Hero[]) => theHeroThatMatchesTheId[0]);
  }
  
  updateNameOfHeroInDatabase(theHeroKey, theNewNameForThisHero):firebase.Promise<string>
  {
      return this.firebaseDb.object(this.collectionName+"/"+theHeroKey).
      update({name:theNewNameForThisHero}).
      then(()=>{return "Updated!"}).
      catch((error:Error)=>{return error});
  }

  addNewHeroToDatabase(theNewHeroName:string):firebase.Promise<string>
  {
    var theNewHero = {name:theNewHeroName};
    return this.firebaseDb.list(this.collectionName).push(theNewHero).
    then(() => "Added New Hero!").catch((error:Error) => error.message);
  }

  deleteAllHeroesFromDatabase():firebase.Promise<string>
  {
    return this.firebaseDb.object(this.collectionName).
    remove().then(() => "Deleted all heroes!").
    catch((error:Error) => error);
  }

  deleteHeroFromDatabase(theHero):firebase.Promise<string>
  {
    return this.firebaseDb.list(this.collectionName+"/"+theHero.$key).
    remove().then(() => theHero.name+" deleted!").
    catch((error:Error) => error);
  }

}
