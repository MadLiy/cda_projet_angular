import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found-component/page-not-found.component';
import { TravelDetailPageComponent } from './pages/travel-detail/travel-detail-page.component';
import { TravelListPageComponent } from './pages/travel-list/travel-list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'travels', component: TravelListPageComponent },
  { path: 'travels/:id', component: TravelDetailPageComponent },
  { path: '**', component: PageNotFoundComponent },
];
