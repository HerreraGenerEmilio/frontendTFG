import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TestViewComponent } from './views/test-view/test-view.component';
import { LoginComponent } from './views/login/login.component';
import { Injectable } from '@angular/core';

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

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'test', component: TestViewComponent}
];

/* export const routes: Routes = [
  { path: '', redirectTo: 'museu', pathMatch: 'full' },
  { path: 'museu', component: MuseuComponent },
  { path: 'hemisferic', component: HemisfericComponent },
]; */