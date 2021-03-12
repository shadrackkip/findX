import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReviewComponent } from './review/review.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ReviewComponent, MyListingsComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
