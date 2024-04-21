import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpClientModule  } from '@angular/common/http';
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

  checkAuthStatus(): Observable<any> {

    const params = new HttpParams()
    const url = this.apiUrl + '/check-auth-status';
    console.log('url:', url);
    /*  return this.http.get('http://localhost:8000/viewUsers', { params }); */
    return this.http.get(url, { params });
  }
  

}
