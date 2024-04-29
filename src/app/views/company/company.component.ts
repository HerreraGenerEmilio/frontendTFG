import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  public condition = 2;

  public selectForm(param:number): void {
    this.condition = param;
  }
}
