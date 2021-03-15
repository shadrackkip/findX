import { User } from './../../models/user.model';
import { AppStateService } from './../../services/app-state.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {



  constructor(
    private appService:AppStateService,
    private router:Router,
    private authService:AuthService,
    private fb:FormBuilder

  ) { }

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })

  login=()=>{

    if(this.loginForm.valid){
      let user = this.loginForm.value;
      this.appService.setAppIsLoading({ isLoading: true });

      this.authService.login(user).subscribe((resp:User)=>{
        console.log(resp);

         if(resp.success){
          this.appService.setModalStatus({'close':true})
          localStorage.setItem('activeUser',JSON.stringify(resp))
          this.appService.setAuthState(resp);

         }else{
          let notifyData = {
            show: true,
            statusClass: 'danger',
            message: resp.message,
          };
          this.appService.appStatusNotification(notifyData);
         }
         this.appService.setAppIsLoading({ isLoading: false });
         this.loginForm.reset()
      })
    }
    //
    // this.router.navigateByUrl('/dashboard/add-listing')
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
