import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

interface Acceso {
  usuario: string;
  puerta: string;
  accesoPermitido: boolean;
  tipoAcceso: 'entrada' | 'salida';
  horaAcceso: Date;
}

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Agrega CommonModule y FormsModule aquí
})
export class AccesoComponent {
  accesos: Acceso[] = []; // Define el tipo de datos

  // Método para manejar el envío del formulario
  agregarAccesoForm(accesoForm: any) {
    const acceso: Acceso = {
      usuario: accesoForm.value.usuario,
      puerta: accesoForm.value.puerta,
      accesoPermitido: accesoForm.value.accesoPermitido === 'true',
      tipoAcceso: accesoForm.value.tipoAcceso,
      horaAcceso: new Date(accesoForm.value.horaAcceso)
    };
    
    this.agregarAcceso(acceso);
    accesoForm.reset(); // Opcional: para reiniciar el formulario después de agregar
  }

  // Lógica para manejar accesos
  agregarAcceso(acceso: Acceso) {
    this.accesos.push(acceso);
  }
}
