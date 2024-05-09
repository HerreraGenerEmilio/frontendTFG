import { Component, Renderer2, OnInit, HostListener } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { InsertComponent } from '../../components/insert/insert.component';
import { UpdateComponent } from '../../components/update/update.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [InsertComponent, UpdateComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  constructor(private obtainDataService: DatabaseService, private router: Router, private renderer: Renderer2) { }

  feedItems: any[] = [];

  public currentPage = 1;
  public pageSize = 8;
  public totalPages = 1;
  public authenticated = false;
  public username = '';
  public logo = '';
  public userId = 0;
  public sectors: any[] = [];
  public actionSelected = 0;
  public offerId = 0;
  public ofertArray: any = '';
  public alreadySelected = false;
  async ngOnInit() {
    this.test();
  }

  async fetchOfertas(page: number, limit: number): Promise<void> {
    try {
      const response: any | undefined = await this.obtainDataService.checkEmployer(page, limit);
      if (response !== undefined) {
        console.log('Respuesta ofertas:', response);
        /*  this.users = response.users;
         this.totalPages = response.lastPage; */
        this.username = response.username;
        this.userId = response.userId;
        this.feedItems = response.ofertas.data;
        this.totalPages = response.ofertas.last_page;
        console.log('feedItems:', this.feedItems);
        console.log('totalPages:', this.totalPages);
      } else {
        console.log('No hay respuesta');
      }
    } catch (error) {
      console.error('Error al recibir los datos:', error);
    }
  }

  async fetchLogo(): Promise<void> {
    try {
      const response: any | undefined = await this.obtainDataService.checkLogo();
      if (response !== undefined) {
        console.log('Respuesta fetchLogo:', response);
        this.logo = response.img;
      } else {
        console.log('No hay respuesta');
      }
    } catch (error) {
      console.error('Error al recibir los datos:', error);
    }
  }

  async fetchSectores(): Promise<void> {
    try {
      const response: any | undefined = await this.obtainDataService.checkSectors();
      if (response !== undefined) {
        console.log('Respuesta fetchSectores:', response);
        this.sectors = response;
      } else {
        console.log('No hay respuesta');
      }
    } catch (error) {
      console.error('Error al recibir los datos:', error);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Current page:', this.currentPage);
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
    this.fetchLogo();
    this.fetchSectores();
  }

  selectAction(action: number, idOffer?: number): void {
    this.actionSelected = action;
    console.log('actionSelected:', this.actionSelected);
    console.log('userId:', this.userId);
    console.log('logo: ', this.logo);

    if (idOffer !== undefined) {
      this.offerId = idOffer;
      console.log('offerId:', this.offerId);
    }

    this.scrollToTop();

  }

  editOffer(offerId: number) {
    this.feedItems.forEach(element => {
      if (element.id === offerId) {
        console.log('elemento: ', element);
        this.ofertArray = element;
        this.actionSelected = 2;
      }
    });

    if (this.alreadySelected === true) {
      this.actionSelected = 3;
      setTimeout(() => {
        //para que recargue el componente
        this.actionSelected = 2;
      }, 1);
    }

    this.alreadySelected = true;
  }

  scrollToTop() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 768) { // 768px es el ancho típico de las pantallas pequeñas (tablets y dispositivos móviles)
      // Ejecuta tu función aquí
      window.scrollTo({ top: 0, behavior: 'auto' }); // O la función que desees ejecutar
    }
  }
}
