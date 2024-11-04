import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Puerta {
  ubicacion: string;
  estado: 'abierta' | 'cerrada';
}

@Component({
  selector: 'app-puerta',
  templateUrl: './puerta.component.html',
  styleUrls: ['./puerta.component.css'],
  standalone: true,
  imports: [FormsModule] // Importa FormsModule
})
export class PuertaComponent {
  puertas: Puerta[] = []; // Define el tipo de datos

  agregarPuertaForm(puertaForm: any) {
    const puerta: Puerta = {
      ubicacion: puertaForm.value.ubicacion,
      estado: puertaForm.value.estado,
    };
    
    this.agregarPuerta(puerta);
    puertaForm.reset(); // Opcional: reiniciar el formulario
  }

  agregarPuerta(puerta: Puerta) {
    this.puertas.push(puerta);
  }
}
