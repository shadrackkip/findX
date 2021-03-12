import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Typewriter from 't-writer.js';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit,AfterViewInit {
  @ViewChild('tw2') typewriterElement2;

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    const target2 = this.typewriterElement2.nativeElement;
    const writer2 = new Typewriter(target2, {
      typeColor: 'var(--primaryC)',
      loop:true
    })
    writer2
    .type('Restaurants')
    .rest(3000)
    .clear()
    .type('Hotels')
    .rest(3000)
    .clear()
    .type('Shopping')
    .rest(3000)
    .removeCursor()
    .start()
  }

}
