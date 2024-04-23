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

  feedItems: any[] =[
    {
      "name": "ejemplo1",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo2",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo3",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo4",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo5",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo6",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo7",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo8",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo9",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo10",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo11",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo12",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo13",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo14",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo15",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo16",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo17",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo18",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo19",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo20",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    }
  ]

  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 1;
  public authenticated = false;
  
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
        this.feedItems=response;
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
    alert(this.currentPage);
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
