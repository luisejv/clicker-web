import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarComplaintComponent } from './components/dashboard/admin/car-complaint/car-complaint.component';
import { CarSaleRegistrationComponent } from './components/dashboard/admin/car-sale-registration/car-sale-registration.component';
import { CarSponsorComponent } from './components/dashboard/admin/car-sponsor/car-sponsor.component';
import { CarValidationComponent } from './components/dashboard/admin/car-validation/car-validation.component';
import { UserValidationComponent } from './components/dashboard/admin/user-validation/user-validation.component';
import { WithdrawalRequestsComponent } from './components/dashboard/admin/withdrawal-requests/withdrawal-requests.component';
import { BalanceComponent } from './components/dashboard/balance/balance.component';
import { CarEditingComponent } from './components/dashboard/car-editing/car-editing.component';
import { CarPublishedComponent } from './components/dashboard/car-published/car-published.component';
import { CarRegistrationComponent } from './components/dashboard/car-registration/car-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterestedCarsComponent } from './components/dashboard/interested-cars/interested-cars.component';
import { PublishedCarsComponent } from './components/dashboard/published-cars/published-cars.component';
import { AutoSemiNuevoComponent } from './components/details/auto-semi-nuevo/auto-semi-nuevo.component';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home2/home2.component';
import { InventoryListingsComponent } from './components/inventory-listings/inventory-listings.component';
import { LoginComponent } from './components/login/login.component';
import { ParticularComponent } from './components/register/particular/particular.component';
import { RegisterComponent } from './components/register/register.component';
import { RemaxComponent } from './components/register/remax/remax.component';
import { ValidationComponent } from './components/validation/validation.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { AdminGuard } from './core/guards/admin.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { ValidatedGuard } from './core/guards/validated.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'inventory-listings',
    component: InventoryListingsComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home2', component: Home2Component },
  { path: 'vehicle-details', component: VehicleDetailsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'registrar-carro',
        component: CarRegistrationComponent,
        canActivate: [ValidatedGuard],
      },
      {
        path: 'editar-carro/:id',
        component: CarEditingComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'carros-publicados',
        component: PublishedCarsComponent,
        canActivate: [ValidatedGuard],
      },
      {
        path: 'publicados-carros',
        component: CarPublishedComponent,
        canActivate: [ValidatedGuard],
      },
      {
        path: 'balance',
        component: BalanceComponent,
        canActivate: [ValidatedGuard],
      },
      {
        //FIXME: aca hay un problema porq REMAX y PARTICULAR compartirán este endpoint
        //NOTE: podríamos hacer '/carros-interesantes/particular' y '/carros-interesantes/remax', cada uno con sus guards
        path: 'carros-interesantes',
        component: InterestedCarsComponent,
        canActivate: [ValidatedGuard],
      },
      {
        path: 'autos-por-validar',
        component: CarValidationComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'solicitudes-franquicia',
        component: UserValidationComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'registrar-venta',
        component: CarSaleRegistrationComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'autos-reportados',
        component: CarComplaintComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'solicitudes-de-pago',
        component: WithdrawalRequestsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'carros-patrocinados',
        component: CarSponsorComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'auto-semi-nuevo',
    component: AutoSemiNuevoComponent,
  },
  {
    path: 'auto-semi-nuevo/:id',
    component: AutoSemiNuevoComponent,
  },
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
  { path: 'validation/:id', component: ValidationComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

/*   { path: 'blog-grid', component: BlogGridComponent },
  { path: 'blog-main', component: BlogMainComponent },
  { path: 'blog-post', component: BlogPostComponent },
    { path: 'reservation-grid', component: ReservationGridComponent },
  { path: 'booking-system', component: BookingSystemComponent },
    { path: 'inventory-grid', component: InventoryGridComponent },*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
