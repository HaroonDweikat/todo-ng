import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  isLogin = false
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    //if the user data  is invalid return
    if (!signInForm.valid) return;

    const email = signInForm.value.email;
    const password = signInForm.value.password;
    this.isLogin =true;
    console.log("email: "+email+"\npass: "+ password);
    this.authService.signIn(email,password);

    setTimeout(()=>{
      this.isLogin =false;
    },2000);



  }
}
