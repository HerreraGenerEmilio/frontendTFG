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

  recibirEmployerOfertas(): Observable<any> {
    const url = this.apiUrl + '/api/ofertasUser';
    console.log('url:', url);
    /*  return this.http.get('http://localhost:8000/viewUsers', { params }); */
    return this.http.get(url);
  }

  async checkAuthStatus(): Promise<any> {
    try {
      // Realizar una solicitud HTTP al backend para verificar el estado de autenticación del usuario
      const response: any = await this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/api/check-auth-status`, { withCredentials: true }).toPromise();
      console.log('Respuesta del servidor:', response);
      return response;
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }

  async checkEmployer(page: number = 1, pageSize: number = 10): Promise<any> {
    try {
      // Realizar una solicitud HTTP al backend para obtener los datos del empleador
      const response: any = await this.http.get<any>(`${this.apiUrl}/api/ofertasUser?page=${page}&pageSize=${pageSize}`, { withCredentials: true }).toPromise();
      console.log('Respuesta del servidor:', response);
      return response;
    } catch (error) {
      console.error('Error al verificar el empleador:', error);
      throw error; // O maneja el error según lo necesites
    }
  }

  async checkLogo(): Promise<any> {
    try {
      // Realizar una solicitud HTTP al backend para obtener los datos del anunciante
      const response: any = await this.http.get<any>(`${this.apiUrl}/api/ofertasImg`, { withCredentials: true }).toPromise();
      console.log('Respuesta del servidor checkLogo:', response);
      return response;
    } catch (error) {
      console.error('Error al verificar el anunciante:', error);
      throw error; // O maneja el error aquí lo necesites
    }
  }

  async checkSectors(): Promise<any> {
    try {
      // Realizar una solicitud HTTP al backend para obtener los datos del anunciante
      const response: any = await this.http.get<any>(`${this.apiUrl}/api/sectores`, { withCredentials: true }).toPromise();
      console.log('Respuesta del servidor Sectores:', response);
      return response;
    } catch (error) {
      console.error('Error al verificar el anunciante:', error);
      throw error; // O maneja el error aquí lo necesites
    }
  }

  async insertOffer(body: any): Promise<any> {
    try {
      // Realizar una solicitud HTTP al backend para enviar los datos de la oferta
      console.log("body: ", body);
      const response: any = await this.http.post<any>(`${this.apiUrl}/api/ofertas2`, body, { withCredentials: true }).toPromise();
      console.log('Respuesta del servidor Insertar oferta:', response);
      return response;
    } catch (error) {
      console.error('Error al insertar la oferta:', error);
      throw error;
    }
}

  

}
