import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/user.service";
@Component
({
  selector:"userSignUp",
  templateUrl:"./userSignUp.component.html"
})

export class UserSignUpComponent
{
  private userEmail:string;
  private userPassword:string;
  private feedbackMessage:any;
  constructor(private userAuthenticationService:UserAuthenticationService)
  {
    this.userEmail = "";
    this.userPassword = "";
    this.feedbackMessage = "";
  }

  addUser()
  {
    this.userAuthenticationService.addUserToFirebase(this.userEmail,this.userPassword).
    then((usersData) => this.feedbackMessage = usersData);
  }
}
