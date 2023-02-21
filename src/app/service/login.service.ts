import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject} from 'rxjs';
import { JwtResponse } from '../model/jwt-response.model';
import { LoginRequest } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  private loggedIn : Subject<boolean> = new ReplaySubject<boolean>(1); 

  private baseUrl = "http://localhost:8080/employees"; 

  private jwtoken: Subject<string> = new ReplaySubject<string>(1);

  /**
   * Constructor
   * @param http Injection of httpClient
   */
  constructor(private http : HttpClient) { }
  /**
   * login method create post request return observable waiting for "subscription"
   * @param token
   * @returns 
   */
  login(token:string) : Observable<boolean>{
    let employeeHeader = new HttpHeaders({'content-type' : 'application/json'});
    console.log("login service");
    return this.http.post<boolean>(`${this.baseUrl}/login`,null,{headers : employeeHeader});
  }


  loginToken(loginRequest:LoginRequest) : Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`,JSON.stringify(loginRequest),{headers:{'content-type' : 'application/json'}});
  }

  confirmLogged(logged :boolean){
    this.loggedIn.next(logged);
  }
  confirmToken(token:string){
    this.jwtoken.next(token);
  }
  whenLoggedIn(){
    return this.loggedIn;
  }
  whenToken(){
    return this.jwtoken;
  }
  logout(){
    this.confirmLogged(false);
    this.confirmToken('');
  }

}
