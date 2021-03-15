import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { AppStateService } from './../../services/app-state.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit, AfterViewInit {
  @ViewChild('closeModal') modalBtn: ElementRef;
  loggedIn: boolean = false;
  user: User;
  constructor(
    private appService: AppStateService,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
  this.authService.getUser()
  }
  ngAfterViewInit(): void {
    this.appService.getModalStatus().subscribe((data: any) => {
      if (data.close) {
        let ele = this.modalBtn.nativeElement;
        ele.click();
      }
    });

    this.appService.getAuthState().subscribe((user: User) => {
      if(Object.keys(user).length>0){
      this.loggedIn = true;
      this.user = user;
      }
    });


  }
}
