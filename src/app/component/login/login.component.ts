import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Subscription } from 'rxjs';
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
      let token = window.btoa(`${this.loginForm.value.username}:${this.loginForm.value.password}`);
      this.loginService.login(token).subscribe((response:boolean)=>{
        if(response){
          this.username = username;
          this.loginService.confirmLogged(true);
          this.loginService.setToken(token);
        }
      })
    }
  }
}
