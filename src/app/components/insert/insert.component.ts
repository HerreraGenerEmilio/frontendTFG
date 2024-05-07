import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


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

  constructor(private formBuilder: FormBuilder) {
   
  }


  ngOnInit(): void {
    console.log("userID:", this.id);
    console.log("logo: ", this.imagen);

    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [this.imagen],
      publicador: [this.id],
      sector: ['', Validators.required]
    });
    
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, submit data
      console.log(this.myForm.value);

      // TODO: Submit data to server
      


    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }
}
