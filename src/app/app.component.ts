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
    <ng-container *ngIf="!isLoginPage">
      <app-navbar></app-navbar> <!-- Navbar visible en todas las páginas excepto login -->
    </ng-container>
    <router-outlet></router-outlet> <!-- Renderiza las vistas de las rutas -->
  `
})
export class AppComponent {
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    // Detecta la ruta activa cuando cambia la navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es /login
        this.isLoginPage = event.urlAfterRedirects === '/login';
      }
    });
  }
}
