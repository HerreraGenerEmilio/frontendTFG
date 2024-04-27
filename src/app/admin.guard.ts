import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';
import { DatabaseService } from './services/database.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private obtainDataService: DatabaseService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      let response: any = await this.obtainDataService.checkAuthStatus();
      console.log('Respuesta del test servidor:', response);
      

      if (response.authenticated == true) {
        console.log('Usuario autenticado:', response);
        if (response.isAdmin) {
          console.log('daleee');
          return true;
        }
        this.router.navigate(['/home'])
        return false; // El usuario está autenticado, permite la navegación
      } else {
        console.log('Usuario no autenticado:', response);
        //window.location.href = 'http://localhost:8000/login';
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      //window.location.href = 'http://localhost:8000/login';
      return false;
    }
  }
};
