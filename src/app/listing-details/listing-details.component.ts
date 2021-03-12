import { Component, OnInit } from '@angular/core';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  lat = -1.2053300152286188;
  lng = 36.77838624616786;

  

  constructor(

  ) { }

  loadConfig =()=>{
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
        imageAutoPlay:true,
        imageAutoPlayInterval:10000
      }
    ];


  }
  loadImages=()=>{
    this.galleryImages = [
      {
        small: 'assets/images/2.jpg',
        medium: 'assets/images/2.jpg',
        big: 'assets/images/2.jpg'
      },
      {
        small: 'assets/images/4.jpg',
        medium: 'assets/images/4.jpg',
        big: 'assets/images/4.jpg'
      },
      {
        small: 'assets/images/5.jpg',
        medium: 'assets/images/5.jpg',
        big: 'assets/images/5.jpg'
      },
      {
        small: 'assets/images/6.jpg',
        medium: 'assets/images/6.jpg',
        big: 'assets/images/6.jpg'
      },
     
    ];
  }

  ngOnInit(): void {
    this.loadConfig()
    this.loadImages()
  }

}
