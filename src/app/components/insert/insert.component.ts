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
      // Enviar directamente los datos del formulario sin envolverlos en un objeto adicional
      this.http.post<any>('http://localhost:8000/api/ofertas', this.myForm.value).subscribe(() => {
        // refrescar pagina?
        window.location.reload();
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }

}