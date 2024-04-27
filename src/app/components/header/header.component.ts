import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private http: HttpClient) { }

  @Input() public authenticated = false;
  @Input() public rol = false;
  public csrfToken: string | null = null;

  ngOnInit() {
    console.log('rol header', this.rol);
    console.log('auth header', this.authenticated);
  }

  logout(): void {
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || '',
    });

    // Realiza una solicitud POST al endpoint de logout
    this.http.post<any>('/api/logout', {}, { headers }).subscribe(() => {
      // Manejar el éxito del logout aquí
    });
  }

  private getCsrfToken(): string | null {
    // Obtener el token CSRF de las cookies del navegador
    const cookieValue = document.cookie.match('(^|;)\\s*XSRF-TOKEN\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || null : null;
  }
}
