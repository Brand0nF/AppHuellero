import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>  <!-- Muestra el navbar en todas las páginas -->
    <router-outlet></router-outlet> <!-- Aquí se cargarán las vistas del contenido -->
  `
})
export class AppComponent {
  title = 'Mi aplicación';
}
