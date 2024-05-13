import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  myForm!: FormGroup;
  sectores:string[] = [
    "Dar de alta empresa",
    "Consulta empleador",
    "Consulta buscador de empleo",
    "Trabajar con nosotros",
    "Denunciar robo de identidad",
    "Otros"
  ];
  contacted:boolean = false;


  constructor(private formBuilder: FormBuilder,
    private obtainDataService: DatabaseService, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log("sectores recibididos OnInit:", this.sectores);

    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      asunto: ['', Validators.required],
      motivo: ['', Validators.required],
      mensaje: ['', Validators.required]
    });

    /* let test = this.getCsrfToken();
    console.log("token:", test); */
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, submit data
      console.log(this.myForm.value);
      // Enviar directamente los datos del formulario sin envolverlos en un objeto adicional
      this.http.post<any>('http://localhost:8000/api/contacto', this.myForm.value).subscribe(() => {
        this.contacted = true;
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }

}
