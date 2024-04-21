import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        // Redirigir o mostrar un mensaje de éxito
      },
      error => {
        // Manejar el error
        console.log(error);
      }
    );
  }
}
