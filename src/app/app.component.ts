import { User } from './models/user.model';
import { AppStateService } from './services/app-state.service';
import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  showNotification: boolean = false;
  message: any;
  statusClass: string;
  constructor(private appService: AppStateService) {
    this.appService.getIfAppIsLoading().subscribe((status: any) => {
      let el: HTMLElement = document.querySelector('.app-spinner');
      let el2: HTMLElement = document.querySelector('#app');
      if (status.isLoading) {
        el.style.display = 'flex';
        el2.style.opacity = '.5';
        el.classList.add('app-spinner-spinning');
      } else {
        el.style.display = 'none';
        el.classList.remove('app-spinner-spinning');
        el2.style.opacity = '1';
      }
    });
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let scrollH = $event.path[1].scrollY;
    let el = document.querySelector('.main-nav');
    if (scrollH >= 105) {
      el.classList.add('with-bg');
    } else {
      el.classList.remove('with-bg');
    }
  }

  ngAfterViewInit(): void {
    this.appService.statusNotifications().subscribe((status: any) => {
      let el: HTMLElement = document.querySelector('.notification-alert');
      let elClasses = ['animate__animated', 'animate__fadeInDown'];
      el.style.display = 'block';
      this.statusClass = status.statusClass;
      this.message = status.message;
      if (status.show) {
        this.showNotification = true;

        el.classList.add(...elClasses);
        setTimeout(() => {
          el.style.display = 'none';
          this.showNotification = false;
        }, 9500);
      } else {
        this.showNotification = false;
      }
    });
  }
}
