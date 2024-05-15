import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessComponent],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {

  myForm!: FormGroup;
  @Input() id = 2000;
  @Input() imagen = '';
  @Input() sectores: any[] = [];
  apiUrl = 'http://localhost:8000';
  success = 0;
  @Input() img = '';
  @Input() type = 'insert';

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
      console.log("aaaaa", this.myForm.value);
      // Enviar directamente los datos del formulario sin envolverlos en un objeto adicional
      this.http.post<any>('http://localhost:8000/api/ofertas', this.myForm.value).subscribe(() => {
        this.sectores.forEach(element => {
          console.log("Par :" ,element.id, this.myForm.value.sector);
          if (element.id == this.myForm.value.sector) {
            this.img = element.logo;
            console.log("SOCORRO FUNCIONA", element);
          }
        });
        
        this.success = 1;
      });
    } else {
      // Form is invalid, display error messages
      alert('Formulario inválido. Asegúrate de rellenar correctamente los campos.');
    }
  }

}