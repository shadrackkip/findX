
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './nav/top/top.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AgmCoreModule } from '@agm/core';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './account/verify-account/verify-account.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { ReactiveFormsModule } from '@angular/forms';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    FooterComponent,
    HomeComponent,
    ListingComponent,
    LoginComponent,
    RegisterComponent,
    ListingDetailsComponent,
    AddListingComponent,
    HomeBannerComponent,
    NotFoundComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    NewPasswordComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,

    NgxGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSFTA05QFqjqJoX3lJzqqs7R2QV901qO4',
    }),
    GooglePlaceModule,
    CKEditorModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxDropzoneModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
