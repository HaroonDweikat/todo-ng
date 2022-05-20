import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../common/services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  isSignUp:boolean = false;
  error = '';
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(signUpForm: NgForm) {
    //if the user data  is invalid return
    if (!signUpForm.valid) return;

    const email = signUpForm.value.email;
    const password = signUpForm.value.password;
    const confirmPassword = signUpForm.value.confirmPassword;
    console.log(password);
    console.log(confirmPassword);
    if(password != confirmPassword){
      this.error = 'Passwords didn\'t matched';
      console.log(this.error);
      return;
    }

    this.isSignUp =true;
    const authObs = this. authService.signUp(email,password);

   authObs.subscribe({
      next: resData =>{
        this.isSignUp =false;
        this.error = '';
        signUpForm.reset();
        this.router.navigate(['/home'])
      },
      error: errorMessage =>{
        this.error=errorMessage;
        console.log(errorMessage);
        this.isSignUp =false;
      }
    });

  }

  navigateToSignIn() {
    this.router.navigate(['/sign-in'])
  }
}
