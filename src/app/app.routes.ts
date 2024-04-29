import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TestViewComponent } from './views/test-view/test-view.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './views/landing/landing.component';
import { AdminGuard } from './admin.guard';
import { CompanyComponent } from './views/company/company.component';

export const routes: Routes = [
 /*  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, */

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'test', pathMatch: 'full', component: TestViewComponent, canActivate: [AdminGuard]},
  { path: 'company', component: CompanyComponent},
  { path: 'home', component: HomeComponent},
  { path: 'landing', component: LandingComponent},
  { path: 'test', component: TestViewComponent}
];

/* export const routes: Routes = [
  { path: '', redirectTo: 'museu', pathMatch: 'full' },
  { path: 'museu', component: MuseuComponent },
  { path: 'hemisferic', component: HemisfericComponent },
]; */