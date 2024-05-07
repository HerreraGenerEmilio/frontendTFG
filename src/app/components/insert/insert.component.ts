import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {

  myForm!: FormGroup;
  @Input() id = 2000;
  @Input() imagen = '';
  @Input() sectores: any[] = [];
  apiUrl = 'http://localhost:8000';

  constructor(private formBuilder: FormBuilder,
    private obtainDataService: DatabaseService, private http: HttpClient) {

  }


  ngOnInit(): void {
    console.log("sectores recibididos OnInit:", this.sectores);

    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [this.imagen],
      publicador: [this.id],
      sector: ['', Validators.required]
    });

    /* let test = this.getCsrfToken();
    console.log("token:", test); */
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, submit data
      console.log(this.myForm.value);
      // TODO: Submit data to server
      const csrfToken = this.getCsrfToken();
      console.log("token:", csrfToken);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'CSRF-TOKEN': csrfToken || '',
      });

      console.log("headers:", headers);
      let test = this.myForm.value;
      this.http.post<any>('http://localhost:8000/api/ofertas2', {test}, { headers }).subscribe(() => {
        // Manejar el éxito del logout aquí
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }

  sendData(): void {
    const csrfToken = this.getCsrfToken();
    console.log("token:", csrfToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken || '',
    });

    // Realiza una solicitud POST al endpoint de logout
    this.http.post<any>('/api/ofertas2', {}, { headers }).subscribe(() => {
      // Manejar el éxito del logout aquí
    });
  }

  private getCsrfToken(): string | null {
    // Obtener el token CSRF de las cookies del navegador
    const cookieValue = document.cookie.match('(^|;)\\s*XSRF-TOKEN\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || null : null;
  }
}
