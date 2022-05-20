import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {map, Observable, take} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.user.pipe(
    //   take(1),
    //   map(user =>{
    //     const isAuth = user == null;
    //     console.log(`is auth ${isAuth}`);
    //     if (isAuth) return true;
    //     // return false;
    //
    //   }),
    //
    //
    // );
    if (this.authService.isAuthenticatedUser) return true;




    return this.router.navigate(['/'])
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
