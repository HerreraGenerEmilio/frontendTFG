import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

   // Método para recibir los datos de los usuarios con paginación
   recibirDatosUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
      const url = this.apiUrl + '/test';
      console.log('url:', url);
   /*  return this.http.get('http://localhost:8000/viewUsers', { params }); */
   return this.http.get(url, { params });
  }
}
