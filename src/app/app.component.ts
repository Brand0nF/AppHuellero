import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Importa RouterModule para usar las rutas
  template: '<router-outlet></router-outlet>' // Asegúrate de tener el <router-outlet></router-outlet> en tu template
})
export class AppComponent {
  title = 'Mi aplicación';
}
