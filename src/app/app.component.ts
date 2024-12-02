import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  template: `
    <!-- Navbar solo se muestra si el usuario está autenticado y no está en la página de login -->
    <ng-container *ngIf="showNavbar">
      <app-navbar></app-navbar>
    </ng-container>
    <router-outlet></router-outlet> <!-- Renderiza las vistas de las rutas -->
  `
})
export class AppComponent {
  showNavbar: boolean = true; // Controla si el navbar debe mostrarse

  constructor(private router: Router) {
    // Detecta la ruta activa cuando cambia la navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Si la ruta es /login, el navbar no se muestra
        // También si no hay token en localStorage (es decir, el usuario no ha iniciado sesión)
        const token = localStorage.getItem('token');
        this.showNavbar = event.urlAfterRedirects !== '/login' && !!token;
      }
    });
  }
}
