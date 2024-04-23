import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Método para recibir los datos de los usuarios con paginación
  recibirDatosOfertas(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    const url = this.apiUrl + '/api/ofertas';
    console.log('url:', url);
    /*  return this.http.get('http://localhost:8000/viewUsers', { params }); */
    return this.http.get(url, { params });
  }

  async checkAuthStatus(): Promise<boolean> {
    try {
      // Realizar una solicitud HTTP al backend para verificar el estado de autenticación del usuario
      const response: any = await this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/api/check-auth-status`,{ withCredentials: true }).toPromise();
      console.log('Respuesta del servidor:', response);
      return response.authenticated;
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }

}
