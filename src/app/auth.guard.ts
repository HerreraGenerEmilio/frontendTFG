import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from './services/database.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpClientModule  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private obtainDataService: DatabaseService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    try {
      const response: any | undefined = await this.obtainDataService.checkAuthStatus().toPromise();
      if (response !== undefined && response.authenticated) {
        return true; // Permitir acceso a la ruta
      } else {
        return this.router.parseUrl('/login'); // Redirigir a la página de inicio de sesión
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return this.router.parseUrl('/login'); // Redirigir a la página de inicio de sesión en caso de error
    }
  }
}
