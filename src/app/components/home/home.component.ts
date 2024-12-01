import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) { }
  navigateToAccesos() {
    this.router.navigate(['/accesos']);  // Redirige a la sección de Accesos
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // Redirige al usuario al menú principal
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Redirige a la página seleccionada desde las tarjetas
  goToPage(path: string) {
    this.router.navigate([path]);
  }
  // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout en el servicio
    this.router.navigate(['/login']); // Redirige al login
  }
}
