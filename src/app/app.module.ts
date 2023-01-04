import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserdtoComponent } from './component/userdto/userdto.component';
import { UserdtoFormComponent } from './component/userdto-form/userdto-form.component';
import { LoginComponent } from './component/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './service/auth-guard.service';
import { GetUserdtoComponent } from './component/get-userdto/get-userdto.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { LoginService } from './service/login.service';

const appRoutes: Routes =[
  {path : 'login', component : LoginComponent},
  {path : 'fetch-user', component : GetUserdtoComponent},
  {path : 'users', component : UserdtoFormComponent},//, canActivate : [AuthGuardService]}
  {path : 'fetch-template', component : UserdtoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserdtoComponent,
    UserdtoFormComponent,
    LoginComponent,
    GetUserdtoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
