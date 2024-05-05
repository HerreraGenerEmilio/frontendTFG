import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {

  myForm: FormGroup;
  id = 1;
  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      publicador: [this.id],
      sector: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, submit data
      console.log(this.myForm.value);
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }
}
