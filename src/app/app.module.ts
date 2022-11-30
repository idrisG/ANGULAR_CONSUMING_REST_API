import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserdtoComponent } from './component/userdto/userdto.component';
import { UserdtoFormComponent } from './component/userdto-form/userdto-form.component';
import { LoginComponent } from './component/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './service/auth-guard.service';

const appRoutes: Routes =[
  {path : 'login', component : LoginComponent},
  {path : 'fetch-user', component : UserdtoComponent},
  {path : 'users', component : UserdtoFormComponent, canActivate : [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    UserdtoComponent,
    UserdtoFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
