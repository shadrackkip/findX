import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { DashboardComponent } from './dashboard.component';
import { AddListingComponent } from './../add-listing/add-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'add-listing',
        component:AddListingComponent
      },
      {
        path:'my-listing',
        component:MyListingsComponent
      },
      {
        path:'reviews',
        component:ReviewComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
