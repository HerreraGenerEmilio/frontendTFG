import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}