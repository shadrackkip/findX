import { AppStateService } from './../../services/app-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(
    private appService:AppStateService
  ) { }

  ngOnInit(): void {
    this.appService.getModalStatus().subscribe((data:any)=>{
      
      
    })
  }

}
