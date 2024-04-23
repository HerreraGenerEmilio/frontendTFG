import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';
import { DatabaseService } from './services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private obtainDataService: DatabaseService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const response: any = await this.obtainDataService.checkAuthStatus();
      console.log('Respuesta del servidor:', response);

      if (response == true) {
        console.log('Usuario autenticado:', response);
        return true; // El usuario está autenticado, permite la navegación
      } else {
        console.log('Usuario no autenticado:', response);
        window.location.href = 'http://localhost:8000/login';
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      window.location.href = 'http://localhost:8000/login';
      return false;
    }
  }

}
