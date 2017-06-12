import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/user.service";
@Component
({
  selector:"userSignIn",
  templateUrl:"./userSignIn.component.html"
})

export class UserSignInComponent
{
  private userEmail:string;
  private userPassword:string;
  constructor(private userAuthenticationService:UserAuthenticationService)
  {
    this.userEmail = "";
    this.userPassword = "";
  }

  signIn()
  {
    console.log(this.userEmail+" "+this.userPassword);
    //TODO: this.userAuthenticationService.signInToFirebase(this.userEmail, this.userPassword);
  }
}
