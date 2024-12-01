import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio de autenticación

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige a la página de login
  }

  // Método general para navegar a cualquier ruta
  navigateTo(route: string): void {
    this.router.navigate([route]);  // Redirige a la ruta seleccionada
  }
}
