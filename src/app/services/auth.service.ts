import { AppStateService } from './app-state.service';
import { environment } from './../../environments/environment.prod';
import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private appService:AppStateService
  ) { }

  register = (user: User) => {

    return this.http.post(`${environment.apiUrl}/register`, user);

  }
  login = (user: User) => {
    return this.http.post(`${environment.apiUrl}/login`, user);
  }
  getUser = () =>{
    let user = localStorage.getItem('activeUser')
    if(user!==null){
      user=JSON.parse(user)
      this.appService.setAuthState(user)
      return {
        isSignedIn:true,
        user
      }
    }else{
      return {
        isSignedIn:false,
        user:null
      }
    }
  }
}
