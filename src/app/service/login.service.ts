import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { JwtResponse } from '../model/jwt-response.model';
import { LoginRequest } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private loggedIn : Subject<boolean> = new ReplaySubject<boolean>(1); 

  private baseUrl = "http://localhost:8080/employees"; 

  private token!:string;
  private jwtoken: Subject<string> = new ReplaySubject<string>(1);

  /**
   * Constructor
   * @param http Injection of httpClient
   */
  constructor(private http : HttpClient) { }
  /**
   * login method create post request return observable waiting for "subscription"
   * @param username 
   * @param password 
   * @returns 
   */
  login(token:string) : Observable<boolean>{
    let employeeHeader = new HttpHeaders({'content-type' : 'application/json', 'Authorization' : 'Basic ' + token});
    console.log("login service");
    this.token=token;
    return this.http.post<boolean>(`${this.baseUrl}/login`,null,{headers : employeeHeader});
  }


  loginToken(loginRequest:LoginRequest) : Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`,JSON.stringify(loginRequest),{headers:{'content-type' : 'application/json'}});
  }

  confirmLogged(logged :boolean){
    this.loggedIn.next(logged);
    if(!logged){
      console.log('log out log service');
      this.confirmToken('');
      this.token='';
    }
  }
  confirmToken(token:string){
    this.jwtoken.next(token);
  }
  getToken():string{
    return this.token;
  }

  whenLoggedIn(){
    return this.loggedIn;
  }
  whenToken(){
    return this.jwtoken;
  }
}
