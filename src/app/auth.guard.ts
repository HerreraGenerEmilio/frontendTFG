import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DatabaseService } from './services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private obtainDataService: DatabaseService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.obtainDataService.checkAuthStatus().then(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Permitir acceso a la ruta protegida
      } else {
        // Redirigir a la página de inicio de sesión
        window.location.href = 'http://localhost:8000/login';
        return false; // No permitir acceso a la ruta actual
      }
    });
  }
}
