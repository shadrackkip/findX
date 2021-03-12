import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  public links = [
    {
      'name':'Dashboard',
      'slug':'',
      'icon':'<i class="fa fa-dashboard"></i>'
    },
    {
      'name':'My Listings',
      'slug':'my-listing',
      'icon':'<i class="fa fa-list-ul"></i>',
      'children':[
        {
          'name':'Active',
          'icon':''
        },
        {
          'name':'Pending',
          'icon':''
        },
        {
          'name':'Expired',
          'icon':''
        },
      ]
    },
    {
      'name':'Add Listing',
      'slug':'add-listing',
      'icon':'<i class="fa fa-plus"></i>'
    },
    {
      'name':'Reviews',
      'slug':'reviews',
      'icon':'<i class="fa fa-star"></i>'
    },
    {
      'name':'Profile',
      'slug':'profile',
      'icon':'<i class="fa fa-user"></i>'
    },
    {
      'name':'Logout',
      'slug':'logout',
      'icon':'<i class="fa fa-sign-out"></i>'
    }
  ]

  ngOnInit(): void {
  }

}
