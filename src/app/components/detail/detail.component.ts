import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  @Input() ofertArray: any = [];
  public test = '';
  ngOnInit(): void {
    console.log('ofertArray view:', this.ofertArray);
    this.test = this.ofertArray.nombre;
  }
}
