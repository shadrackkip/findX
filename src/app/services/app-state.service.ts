import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private closeModal:BehaviorSubject<{}> = new BehaviorSubject({'close':false})

  constructor() { }

  getModalStatus():Observable<{}> {

    return this.closeModal.asObservable()
  }
  setModalStatus(data:{'close':boolean}){
    this.closeModal.next(data)
  }
}
