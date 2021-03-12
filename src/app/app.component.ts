import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let scrollH = $event.path[1].scrollY;
    let el = document.querySelector('.main-nav');
    console.log(scrollH);
    if(scrollH>=105){
      
      el.classList.add('with-bg')
    
      
    }else{
      el.classList.remove('with-bg')
    }
  } 
}
