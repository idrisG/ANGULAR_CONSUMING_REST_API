import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Userdto } from '../../model/userdto';
import { HttpClient } from '@angular/common/http';
import { UserdtoService } from '../../service/userdto.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { catchError, map, Observable, Subscription, take, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdto-form',
  templateUrl: './userdto-form.component.html',
  styleUrls: ['./userdto-form.component.css']
})

export class UserdtoFormComponent {
  /**
   * Constructor, injection of multiple services and FormBuilder
   * @param userdtoService 
   * @param loginService 
   * @param formBuilder 
   */
  constructor(private userdtoService : UserdtoService, private loginService : LoginService, private formBuilder : FormBuilder) { }
  loggedIn = this.loginService.whenLoggedIn().pipe(map(log=>{console.log(`userdtoFormComponent log`);return log;}));

  /* Form coresponding to fields of userdto*/
  formUser = this.formBuilder.group({
    username: ['',[Validators.required,Validators.maxLength(40),Validators.pattern("[a-zA-Z0-9_]+")]],
    birthdate: ['',Validators.required],
    country : ['France'],
    phoneNumber : [,[Validators.pattern("[0-9]{10}|[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}")]],
    gender : []
  });
  /*
   * Getters used for error message in template 
   */
   
  get username(){return this.formUser.get('username');}
  get birthdate(){return this.formUser.get('birthdate');}
  get phoneNumber(){return this.formUser.get('phoneNumber');}

  /**
   * Create Userdto then send it as JSON.stringify as body of post request
   * Method used to register a user
   */
  create(){
    this.userdtoService.createUser(JSON.stringify(this.formUser.value))
      .pipe(take(1)).subscribe({
        next: (userdto =>{ 
        console.log(userdto);
        console.log("subscribe userdtoForm");
        }), 
        error: (error => alert(error.error.message))
      });
  }
}
