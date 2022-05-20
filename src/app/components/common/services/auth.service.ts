import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  isAuthenticatedUser = false;
  user = new BehaviorSubject<User | null>(null) ;
  error!: string;

  constructor(private http: HttpClient,private router:Router) {
  }



  autoLogin(){
    let userData: { email: string; id: string; _token: string; _tokenExpireDate: string } ;
    userData = JSON.parse(localStorage.getItem('userData')!) ;
    if (!userData){
      return;
    }
    const loadedUser = new User(userData.id,userData.email,userData._token,new Date(userData._tokenExpireDate));
    if (loadedUser.token){
      this.isAuthenticatedUser =true;
      this.user.next(loadedUser);
      this.router.navigate(['/home'])

    }
  }
  logout(){
    this.isAuthenticatedUser = false;
    this.router.navigate(['/sign-in'])
    localStorage.removeItem('userData')

  }

  signUp(email: string, password: string) {
    return this.sendRequest(email, password, 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYgNv9XVGnsV1jGVy-AYoJkQdiO80rPAU');
  }

  signIn(email: string, password: string) {
    return this.sendRequest(email, password,
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYgNv9XVGnsV1jGVy-AYoJkQdiO80rPAU');
  }

  sendRequest(email: string, password: string, url: string) {
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
        tap(resData=>{
          console.log(resData);
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new User(resData.localId, resData.email, resData.idToken, expirationDate);
          this.user.next(user);
          this.isAuthenticatedUser =true
          localStorage.setItem('userData', JSON.stringify(user))
        }),
      catchError(
        (err) => {
          this.isAuthenticatedUser =false;
          let errorMessage = '';
          switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMessage = 'Password sign-in is disabled for this project';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct.';
              break;
            default:
              errorMessage = 'An unknown error occurred!';
          }
          return throwError(() => errorMessage)
        }
      ));
  }
}
