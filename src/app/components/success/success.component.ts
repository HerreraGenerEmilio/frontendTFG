import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  @Input() logo!: string;
  @Input() type!: string;
  persistanceTextArray: string[] = [
    "¡Registro agregado con éxito!",
    "¡Registro actualizado con éxito!",
    "¡Registro eliminado con éxito!"
  ]
  persistanceText: string = '';

  ngOnInit() {
    console.log(this.logo, this.type);
    switch (this.type) {
      case "insert":
        this.persistanceText = this.persistanceTextArray[0];
        break;
      case "update":
        this.persistanceText = this.persistanceTextArray[1];
        break;
      case "delete":
        this.persistanceText = this.persistanceTextArray[2];
        break;
      default:
        break;
    }
    console.log("Type:", this.persistanceText);
  }

 
  
}
