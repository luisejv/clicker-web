import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
