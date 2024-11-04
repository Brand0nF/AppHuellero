import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegistroPuerta {
  puerta: string;
  accion: 'Apertura' | 'Cierre';
  hora: string;
}

@Component({
  selector: 'app-registro-puerta',
  templateUrl: './registro-puerta.component.html',
  styleUrls: ['./registro-puerta.component.css'],
  standalone: true,
  imports: [FormsModule] // Importa FormsModule
})
export class RegistroPuertaComponent {
  registros: RegistroPuerta[] = []; // Define el tipo de datos

  agregarRegistroForm(registroForm: any) {
    const registro: RegistroPuerta = {
      puerta: registroForm.value.puerta,
      accion: registroForm.value.accion,
      hora: registroForm.value.hora,
    };
    
    this.agregarRegistro(registro);
    registroForm.reset(); // Opcional: reiniciar el formulario
  }

  agregarRegistro(registro: RegistroPuerta) {
    this.registros.push(registro);
  }
}
