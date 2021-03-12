import { AppStateService } from './../../services/app-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  constructor(
    private appService:AppStateService,
    private router:Router
  ) { }

  login=()=>{
    this.appService.setModalStatus({'close':true})
    this.router.navigateByUrl('/dashboard/add-listing')
  }

  ngOnInit(): void {
    
  }

  closeModal =()=>{
    this.appService.setModalStatus({'close':true})
    this.router.navigateByUrl('/register')

  }
  goToForgetPassword =()=>{
    this.appService.setModalStatus({'close':true})
    this.router.navigateByUrl('/forget-password')
  }

}
