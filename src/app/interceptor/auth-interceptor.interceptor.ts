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
  private jwtoken = this.loginService.whenToken().subscribe((token)=>{
    console.log(token);
    this.token=token;
  });
  constructor(private loginService:LoginService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url!=="http://localhost:8080/employees/login"){
      request = this.addAuthToken(request);
    }
    return next.handle(request).pipe(
      map((event)=>{
        console.log(event);
        if(event instanceof HttpResponse && event.body){ //user logged in using correct credentials, response server body is true
          console.log(`this token : ${this.token}`);
        } else {
          console.log(`response event : ${event}`);
        }
        return event;
      })
      ,catchError((err)=>{
        console.log('interceptor error');
        console.log(`err : ${err}`);
        console.log(err);
        console.log(`err.error : ${err.error}`);
        console.log(`err.error.error : ${err.error.error}`);
        alert(err.error);
        return of(err);
      })
    );
  }

  addAuthToken(request:HttpRequest<any>){
    return request.clone({
      setHeaders:{
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  ngOnDestroy(): void {
    this.jwtoken.unsubscribe();
  }
}
