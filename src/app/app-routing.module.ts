import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BlogGridComponent } from './components/blog-grid/blog-grid.component';
import { BlogMainComponent } from './components/blog-main/blog-main.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BookingSystemComponent } from './components/booking-system/booking-system.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarRegistrationComponent } from './components/dashboard/car-registration/car-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublishedCarsComponent } from './components/dashboard/published-cars/published-cars.component';
import { UnoComponent } from './components/dashboard/shared/uno/uno.component';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home2/home2.component';
import { InventoryGridComponent } from './components/inventory-grid/inventory-grid.component';
import { InventoryListingsComponent } from './components/inventory-listings/inventory-listings.component';
import { LoginComponent } from './components/login/login.component';
import { ParticularComponent } from './components/register/particular/particular.component';
import { RegisterComponent } from './components/register/register.component';
import { RemaxComponent } from './components/register/remax/remax.component';
import { ReservationGridComponent } from './components/reservation-grid/reservation-grid.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inventory-grid', component: InventoryGridComponent },
  {
    path: 'inventory-listings',
    component: InventoryListingsComponent,
  },
  {
    path:
      'inventory-listings/:carType/:carSubset/:carBrand/:carModel/:carMaxPrice',
    component: InventoryListingsComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog-grid', component: BlogGridComponent },
  { path: 'blog-main', component: BlogMainComponent },
  { path: 'blog-post', component: BlogPostComponent },
  { path: 'home2', component: Home2Component },
  { path: 'reservation-grid', component: ReservationGridComponent },
  { path: 'booking-system', component: BookingSystemComponent },
  { path: 'vehicle-details', component: VehicleDetailsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'registrar-carro',
        component: CarRegistrationComponent,
      },
      {
        path: 'carro/:id',
        component: CarRegistrationComponent,
      },
      {
        path: 'carros-publicados',
        component: PublishedCarsComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'registro',
    component: RegisterComponent,
    children: [
      {
        path: 'particular',
        component: ParticularComponent,
      },
      {
        path: 'remax',
        component: RemaxComponent,
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
