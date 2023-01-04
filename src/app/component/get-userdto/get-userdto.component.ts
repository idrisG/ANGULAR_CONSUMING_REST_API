import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Userdto } from 'src/app/model/userdto';
import { UserdtoService } from 'src/app/service/userdto.service';

@Component({
  selector: 'app-get-userdto',
  templateUrl: './get-userdto.component.html',
  styleUrls: ['./get-userdto.component.css']
})
export class GetUserdtoComponent {
  allUserdto! : Userdto [];
  constructor(private userdtoService : UserdtoService) { }

  /**
   * Fetch user by id using getUser method from userdtoService
   * @param id 
   */
  getUser(id : string){
/*    let user = new Userdto(0,'username','1996-01-01','France','0102030405','MALE');
    this.allUserdto=[user,user,user,user,user,user];/* */
    this.userdtoService.getUser(Number(id)).pipe(take(1)).subscribe({
      next : (user => { 
        this.allUserdto = [user];
        console.log(this.allUserdto);
      }),
      error : (error => {
        alert(error.error.message);
      })
    });/* */
  }

  getAllUser(){
    this.userdtoService.getAllUser().pipe(take(1)).subscribe({
      next : (allUser => { 
        this.allUserdto=allUser;
        console.log(this.allUserdto);
      }),
      error : (error => {
        alert(error.error.message);
      })
    });
  }

}
