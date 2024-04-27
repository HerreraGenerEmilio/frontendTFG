import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatabaseService } from './services/database.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule ],
  providers: [DatabaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private obtainDataService: DatabaseService, private router: Router) { }
  
  title = 'frontend';
  @Input() public authenticated = false;
  @Input() public rol = false;

  async ngOnInit() {
    let logged:any = await this.obtainDataService.checkAuthStatus()
    console.log('respuesta root', logged);
    this.rol = logged.isAdmin;
    console.log('rol root', this.rol);
    this.authenticated = logged.authenticated;
    console.log('auth root', this.authenticated);
  }
}
