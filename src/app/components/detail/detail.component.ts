import { Component, Input } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  constructor(private http: HttpClient) { }

  @Input() ofertArray: any = [];

  public test = '';
  public fechActualizacion = '';
  public nombreSector = '';
  public nombrePublicador = '';

  async ngOnInit(): Promise<void> {
    console.log('ofertArray view:', this.ofertArray);
    this.fechActualizacion = this.convertirTimestamp(this.ofertArray.updated_at);
    console.log('test:', this.test);
    this.nombreSector = await this.getSectorName(this.ofertArray.sector);
    console.log('nombreSector:', this.nombreSector);
    this.nombrePublicador = await this.getPublicador();
    console.log('nombrePublicador:', this.nombrePublicador);
  }

  convertirTimestamp(timestamp: string): string {
    const fecha = new Date(timestamp);
    const d = fecha.getDate();
    const m = fecha.getMonth() + 1;
    const a = fecha.getFullYear();
    return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${a}`;
  }

  async getSectorName(id: number): Promise<string> {
    console.log('id sector:', id);
    
    try {
        const sector = await this.http.get<any>(`http://localhost:8000/api/sectores/${id}`).toPromise();
        console.log("sector:", sector);
        
        if (sector && sector.nombre) {
          let nombre: string = sector.nombre;
            return nombre; // Devuelve el nombre del sector si está disponible
        } else {
            console.error('El sector devuelto no tiene un nombre válido:', sector);
            throw new Error('El sector devuelto no tiene un nombre válido'); // Lanza un error si el sector no tiene un nombre válido
        }
    } catch (error) {
        console.error('Error al obtener el sector:', error);
        throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
    }
}

async getPublicador(): Promise<string> {
  
  try {
      const publicador = await this.http.get<any>(`http://localhost:8000/api/ofertasPublicador`, { withCredentials: true }).toPromise();
      console.log("publicador:", publicador);
      
      if (publicador) {
        let publi: string = publicador;
          return publi; 
      } else {
          console.error('El publicador devuelto no tiene un nombre válido:', publicador);
          throw new Error('El publicador devuelto no tiene un nombre válido'); 
      }
  } catch (error) {
      console.error('Error al obtener el publicador:', error);
      throw error;
  }
}


}
