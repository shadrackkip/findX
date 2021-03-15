import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private closeModal:BehaviorSubject<{}> = new BehaviorSubject({'close':false})
  private statusNotification:BehaviorSubject<{}> = new BehaviorSubject({})
  private appIsLoading:BehaviorSubject<{}> = new BehaviorSubject({})
  private authState:BehaviorSubject<{}>=new BehaviorSubject({})

  constructor() { }

  getModalStatus():Observable<{}> {

    return this.closeModal.asObservable()
  }
   statusNotifications(){
       return this.statusNotification.asObservable()
  }
  setModalStatus(data:{'close':boolean}){
    this.closeModal.next(data)
  }

   appStatusNotification(data){
    this.statusNotification.next(data)
  }

  // app is loading
  getIfAppIsLoading():Observable<any>{
    return this.appIsLoading.asObservable();
  }
  setAppIsLoading(status){
      this.appIsLoading.next(status);
  }

  //app authentication state
  getAuthState = () => {
   return this.authState.asObservable();
  }

  setAuthState = (user) => {
    this.authState.next(user)
  }

}
