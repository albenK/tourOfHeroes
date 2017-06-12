import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import * as firebase from "firebase/app";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserAuthenticationService
{
  constructor(private firebaseAuth:AngularFireAuth)
  {

  }

  addUserToFirebase(theUserEmail,theUserPassword):firebase.Promise<firebase.User>
  {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(theUserEmail,theUserPassword).
    then((newUser)=> newUser).
    catch((error:Error)=>error);
  }
}
