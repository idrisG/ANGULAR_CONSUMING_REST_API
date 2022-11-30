import { Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { Userdto } from '../../model/userdto';
import { UserdtoService } from '../../service/userdto.service';

@Component({
  selector: 'app-userdto',
  templateUrl: './userdto.component.html',
  styleUrls: ['./userdto.component.css'],
  providers: [UserdtoService]
})
export class UserdtoComponent {

  userdto! : Userdto;
  constructor(private userdtoService : UserdtoService) { }

  /**
   * Fetch user by id using getUser method from userdtoService
   * @param id 
   */
  getUser(id : string){
    this.userdtoService.getUser(Number(id)).pipe(take(1)).subscribe({
      next : (user => { 
        this.userdto=user;
        console.log(this.userdto);
      }),
      error : (error => {
        alert(error.error.message);
      })
    });  
  }
}
