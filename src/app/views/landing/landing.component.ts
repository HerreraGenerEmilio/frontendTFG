import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private obtainDataService: DatabaseService, private router: Router) { }

  feedItems: any[] = [];

  public currentPage = 1;
  public pageSize = 6;
  public totalPages = 1;
  public authenticated = false;

  public landinImgs = [
    "../../../assets/imgs/sectores/Hosteleria.png",
    "../../../assets/imgs/sectores/HR.png",
    "../../../assets/imgs/sectores/IT.png",
    "../../../assets/imgs/sectores/Log.png",
  ]

  public landingTexts = [
    "¿Tu negocio en el sector de la hostelería necesita personal cualificado? Publica tus vacantes en Jobhub y encuentra a los mejores profesionales para satisfacer las necesidades de tu establecimiento.",
    "¿Tu empresa está en busca de expertos en recursos humanos para fortalecer tu equipo? Publica tus oportunidades laborales con Jobhub y encuentra a los profesionales de RH que impulsarán el crecimiento y el desarrollo de tu organización.",
    "¿Tu empresa está buscando talento en el campo de la tecnología? Publica tus ofertas de empleo en Jobhub y encuentra a los mejores profesionales en el área de tecnología e informática.",
    "¿Tu empresa de logística busca optimizar sus operaciones con profesionales capacitados? Publica tus vacantes con Jobhub y encuentra a los especialistas en logística y cadena de suministro que asegurarán la eficiencia y la puntualidad en todas tus entregas."
  ]


  async ngOnInit() {
    this.test();
    let logged = await this.obtainDataService.checkAuthStatus()
    console.log('respuesta servidor', logged);
    if (logged == true) {
      this.router.navigate(['/home']);
    }
  }

  async fetchOfertas(page: number, limit: number): Promise<void> {
    try {
      const response: any | undefined = await this.obtainDataService.recibirDatosOfertas(this.currentPage, this.pageSize).toPromise();
      if (response !== undefined) {
        console.log('Respuesta ofertas:', response);
        /*  this.users = response.users;
         this.totalPages = response.lastPage; */
        this.feedItems = response.data;
        this.totalPages = response.last_page;
        console.log('feedItems:', this.feedItems);
      } else {
        console.log('No hay respuesta');
      }
    } catch (error) {
      console.error('Error al recibir los datos:', error);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchOfertas(this.currentPage, this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onPageChange(this.currentPage);
    }
  }

  test(): void {
    this.fetchOfertas(this.currentPage, this.pageSize);
  }

}
