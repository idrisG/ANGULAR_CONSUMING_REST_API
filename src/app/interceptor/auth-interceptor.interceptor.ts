import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor, OnDestroy {
  private token!:string;
  /*private loggedIn = this.loginService.whenLoggedIn().subscribe((logged)=>{
    if(!logged){
      this.token=''; //We use '' instead of this.loginService.getToken() since this subscribe happen before the token is change in case of logout
    }                //Searching for a better way
  });/**/
  private jwtoken = this.loginService.whenToken().subscribe((token)=>{
    console.log(token);
    this.token=token;
  });
  constructor(private loginService:LoginService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(this.loginService.getToken());
    if(request.url==='http://localhost:8080/employees/login'){
      //this.token=request.headers.get('authorization')?.split(' ')[1];
      return next.handle(request).pipe(
        map((event)=>{
          if(event instanceof HttpResponse && event.body){ //user logged in using correct credentials, response server body is true
            //this.token=this.loginService.getToken();
            console.log(`this token : ${this.token}`);
          }
          return event;
        })
        ,catchError((err)=>{
          //this.token='';
          alert(err.error);
          return of(err);
        })
      );
    }
    console.log(request.method);
   // if(request.method!=='GET'){
      return next.handle(this.addAuthToken(request)).pipe((event)=>{
        console.log('post method not login');
        console.log(this.token);
        return event;
      },
      catchError((err)=>{
        alert(err.error.message);
        return of(err);
      }));
    //}
    /*console.log('get method');
    return next.handle(request);/**/
  }

  addAuthToken(request:HttpRequest<any>){
/*    const token=this.loginService.getToken();
    console.log(token);
    console.log(this.loginService.getToken());
    console.log(this.loginService.setToken(''));
*/    
    return request.clone({
      setHeaders:{
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
/*    return request.clone({
      setHeaders: {
        'content-type': 'application/json',
        'Authorization': `Basic ${this.token}`
      }
    });
  /**/}

  ngOnDestroy(): void {
//    this.loggedIn.unsubscribe();
    this.jwtoken.unsubscribe();
  }
}
