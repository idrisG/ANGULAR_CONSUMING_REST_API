import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Userdto } from '../model/userdto';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserdtoService {

  private baseUrl = "http://localhost:8080/users";
  /**
   * Constructor
   * @param http injection of HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * Create post request with this.baseUrl as url,  stringifyed userdto as body and a header
   * @param userdto 
   * @returns Observable<Userdto> response from server
   */
  createUser(token :string, userdto : string) : Observable<Userdto>{
    let userHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Basic ' + token });
    return this.http.post<Userdto>(`${this.baseUrl}`,userdto,{headers : userHeader});
  }

  /**
   * Create get request to fetch userdto by id with this.baseUrl/id as url
   * @param id 
   * @returns Observable<Userdto> response from server
   */
  getUser(id:number) : Observable<Userdto> {
    return this.http.get<Userdto>(`${this.baseUrl}/${id}`);
  }
}
