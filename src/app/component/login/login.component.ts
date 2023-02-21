import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { JwtResponse } from 'src/app/model/jwt-response.model';
import { LoginRequest } from 'src/app/model/login-request.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  private username!:string|null;
  loggedIn = this.loginService.whenLoggedIn().pipe(map((log)=>{return log;}));
  //logged = false;
  loginForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });
  constructor(private loginService : LoginService) {}

  /**
   * Username getter
   */
  getUsername():string|null{
    return this.username;
  }
  /**
   * login method calls login method from loginService to send post request
   */
  login(){
    if(this.loginForm.value.username && this.loginForm.value.password){
      let username = this.loginForm.value.username;
      let loginRequest = new LoginRequest(this.loginForm.value.username,this.loginForm.value.password);
      this.loginService.loginToken(loginRequest).subscribe((response:JwtResponse)=>{
        console.log(response);
        if(response){
          this.loginService.confirmToken(response.token);
          this.username = response.username;
          this.loginService.confirmLogged(true);
          this.loginForm.reset();
        }
      })
    }
  }
}
