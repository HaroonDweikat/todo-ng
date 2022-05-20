import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../common/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../common/models/user.model";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  isLogin:boolean = false;
  error = null;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  onSubmit(signInForm: NgForm) {
    //if the user data  is invalid return
    if (!signInForm.valid) return;

    const email = signInForm.value.email;
    const password = signInForm.value.password;
    this.isLogin =true;
    console.log("email: "+email+"\npass: "+ password);
    const authObs = this.authService.signIn(email,password);
    this.isLogin =true;
    authObs.subscribe({
      next: resData =>{
        console.log(resData);

        // User.init(resData.localId,resData.email,resData.idToken);
        this.isLogin =false;
        signInForm.reset();
        this.router.navigate(['/home'])
      },
      error: errorMessage =>{
        this.error=errorMessage;
        console.log(errorMessage);
        this.isLogin =false;
        return;
      }
    });


  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up'])
  }


}
