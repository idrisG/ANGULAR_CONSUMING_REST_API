import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { __asyncValues } from 'tslib';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  //loggedIn = this.loginService.whenLoggedIn().pipe(map((log)=>{return log;}));
  constructor(private _router : Router, private loginService : LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> { 
    //this.loginService.whenLoggedIn().subscribe((log)=>{console.log(log);});
    //console.log(this.loggedIn);
    //return this.loggedIn;
    return true;
  }
}
