import { Component, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  myForm!: FormGroup;
  @Input() id = 2000;
  @Input() imagen = '';
  @Input() sectores: any[] = [];
  @Input() oferta = 70000000;
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() sector = '';
  @Input() ofertArray: any= [];

  apiUrl = 'http://localhost:8000';

  constructor(private formBuilder: FormBuilder,
    private obtainDataService: DatabaseService, private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log("ofertas recibidas OnInit:", this.ofertArray);
    
    this.myForm = this.formBuilder.group({
      id: [this.ofertArray.id],
      nombre: [this.ofertArray.nombre, Validators.required],
      descripcion: [this.ofertArray.descripcion, Validators.required],
      imagen: [this.imagen],
      publicador: [this.ofertArray.publicador],
      sector: [this.ofertArray.sector, Validators.required]
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, submit data
      console.log(this.myForm.value);
      // Enviar directamente los datos del formulario sin envolverlos en un objeto adicional
      this.http.put<any>('http://localhost:8000/api/ofertas', this.myForm.value).subscribe(() => {
        // refrescar pagina?
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }

}