import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn : Subject<boolean> = new ReplaySubject<boolean>(1); 

  private baseUrl = "http://localhost:8080/employee"; 

  private token!:string;
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
    return this.http.post<boolean>(`${this.baseUrl}/login`,null,{headers : employeeHeader});
  }

  confirmLogged(logged :boolean){
    this.loggedIn.next(logged);
  }
  setToken(token : string){
    this.token = token;
  }
  getToken():string{
    return this.token;
  }

  whenLoggedIn(){
    return this.loggedIn;
  }
}
