import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent{
  title = 'add-user-app';
  count = 0;
  constructor(private loginService : LoginService){}
  loggedIn = this.loginService.whenLoggedIn().pipe(map((log) =>{console.log(`appComponent log`);return log;}));
  logout(): void {
    console.log(this.loggedIn);
    this.loginService.confirmLogged(false);
  }
}
