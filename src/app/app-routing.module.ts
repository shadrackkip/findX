import { DashboardModule } from './dashboard/dashboard.module';
import { AddListingComponent } from './add-listing/add-listing.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { RegisterComponent } from './account/register/register.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
 {
   path:'',
   component:HomeComponent
 },
{
  path:'listings',
  component:ListingComponent
},

 {
  path:'listing/:slug',
  component:ListingDetailsComponent
 },
 {
  path:'register',
  component:RegisterComponent
 },
 {
   path:'forget-password',
   component:ForgotPasswordComponent
 },
 {
  path:'reset-password/:token',
  component:NewPasswordComponent
 },
 {
   path:'**',
   component:NotFoundComponent
 }
];

@NgModule({
  imports: [
    DashboardModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
