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

  /* logout(): void {
    this.clearAllCookies();
    const csrfToken = this.getCsrfToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || '',
    });

    
    this.authenticated = false;

    // Realiza una solicitud POST al endpoint de logout
    this.http.post<any>('/api/logoutt', {}, { headers }).subscribe(() => {
      // Manejar el éxito del logout aquí
    });
  } */

  private getCsrfToken(): string | null {
    // Obtener el token CSRF de las cookies del navegador
    const cookieValue = document.cookie.match('(^|;)\\s*XSRF-TOKEN\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || null : null;
  }

   clearAllCookies() {
    // Obtiene todas las cookies actuales
    const cookies = document.cookie.split(";");
    console.log(cookies);
    // Itera sobre todas las cookies y las elimina una por una
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
