import { environment } from './../../environments/environment';
import { AppStateService } from './app-state.service';
import { AuthService } from './auth.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(
    private authService:AuthService,
    private appService: AppStateService,
    private httpClient:HttpClient
  ) { }

  addListing = (data) =>{
    if(this.authService.getUser()){
      let user:User = JSON.parse(localStorage.getItem('activeUser'));
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.data.token}`
      })
      return this.httpClient.post(`${environment.apiUrl}/listing`,data,{
        headers:headers
      })
    }else{
      let notifyData = {
        show: true,
        statusClass: 'danger',
        message: 'Please login to save you ad details',
      };
      this.appService.appStatusNotification(notifyData);
    }
  }

  addPhotos = (photos) =>{
    if(this.authService.getUser()){
      let user:User = JSON.parse(localStorage.getItem('activeUser'));
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.data.token}`
      })
      return this.httpClient.post(`${environment.apiUrl}/photos`,photos,{
        headers:headers
      })
    }else{
      let notifyData = {
        show: true,
        statusClass: 'danger',
        message: 'Please login to save you ad details',
      };
      this.appService.appStatusNotification(notifyData);
    }
  }
}
