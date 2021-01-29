import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { InventoryGridComponent } from './components/inventory-grid/inventory-grid.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogGridComponent } from './components/blog-grid/blog-grid.component';
import { BlogMainComponent } from './components/blog-main/blog-main.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { Home2Component } from './components/home2/home2.component';
import { BookingSystemComponent } from './components/booking-system/booking-system.component';
import { InventoryListingsComponent } from './components/inventory-listings/inventory-listings.component';
import { ReservationGridComponent } from './components/reservation-grid/reservation-grid.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './core/services/loader-interceptor.service';
import { SpinnerModule } from './components/shared/spinner/spinner.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './core/services/storage.service';
import { SidebarComponent } from './components/dashboard/shared/sidebar/sidebar.component';
import { UnoComponent } from './components/dashboard/shared/uno/uno.component';
import { CarRegistrationComponent } from './components/dashboard/car-registration/car-registration.component';
import { DataService } from './core/services/data.service';
import { CommonModule } from '@angular/common';
import { PublishedCarsComponent } from './components/dashboard/published-cars/published-cars.component';
import { RegisterComponent } from './components/register/register.component';
import { ParticularComponent } from './components/register/particular/particular.component';
import { RemaxComponent } from './components/register/remax/remax.component';
import { PublishedCarComponent } from './components/shared/published-car/published-car.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryGridComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    BlogGridComponent,
    BlogMainComponent,
    BlogPostComponent,
    Home2Component,
    BookingSystemComponent,
    InventoryListingsComponent,
    ReservationGridComponent,
    VehicleDetailsComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    UnoComponent,
    CarRegistrationComponent,
    PublishedCarsComponent,
    RegisterComponent,
    ParticularComponent,
    RemaxComponent,
    PublishedCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    HttpClientModule,
    StorageService,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
