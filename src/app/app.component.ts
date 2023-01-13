import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'add-user-app';
  menuChecked = false;

  constructor(private loginService : LoginService, router : Router){
    router.events.subscribe( (event: Event) => {
      if (this.menuChecked && event instanceof NavigationStart) {
          document.getElementById("menu-toggle")?.click();
          console.log("router event");
      }
    });
  }

  loggedIn = this.loginService.whenLoggedIn().pipe(map((log) =>{console.log(`appComponent log`);return log;}));
  logout(): void {
    console.log('logout');
    this.loginService.logout();
  }
}
