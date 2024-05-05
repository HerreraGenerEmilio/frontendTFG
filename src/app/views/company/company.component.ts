import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { InsertComponent } from '../../components/insert/insert.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [InsertComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  
  constructor(private obtainDataService: DatabaseService, private router: Router) { }

  feedItems: any[] = [];

  public currentPage = 1;
  public pageSize = 8;
  public totalPages = 1;
  public authenticated = false;
  public username = '';
  public logo = '';

  public actionSelected = 0;

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
  }
}
