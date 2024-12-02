import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { PuertaService } from './../../services/puerta.service'; // Importa el servicio que interactúa con la API
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Para realizar las solicitudes HTTP

@Component({
  selector: 'app-ubicaciones',
  standalone: true, // Declarar el componente como standalone
  imports: [FormsModule, CommonModule], // Importar FormsModule para el uso de ngModel
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {
  vistaActual: string = 'listar'; // Controla la vista (listar, crear, detalles)
  puertas: any[] = []; // Lista de puertas
  nuevaPuerta = { ubicacion: '', estado: 'abierta' }; // Datos del formulario para nueva puerta
  puertaActual: any = null; // Puerta seleccionada para editar
  accion: string = 'Apertura'; // Acción por defecto
  hora: string = this.formatearHora(new Date()); // Hora actual por defecto
  errorMessage: string = ''; // Mensaje de error para la validación

  constructor(private puertaService: PuertaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPuertas(); // Cargar las puertas registradas al iniciar el componente
  }

  cargarPuertas(): void {
    this.puertaService.listarPuertas().subscribe((puertas) => {
      this.puertas = puertas;
    });
  }

  seleccionarPuerta(puerta: any): void {
    this.puertaActual = puerta;
    this.vistaActual = 'detalles';
  }

  obtenerColorIcono(estado: string): string {
    return estado === 'abierta' ? 'green' : 'red';
  }

  // Método para registrar la puerta
  registrarPuerta(): void {
    // Primero, restablecer el mensaje de error
    this.errorMessage = '';

    // Validación para la ubicación
    if (!this.validarUbicacion(this.nuevaPuerta.ubicacion)) {
      this.errorMessage = 'La ubicación solo puede contener letras y espacios.';
      return;
    }

    // Crear la puerta
    this.puertaService.crearPuerta(this.nuevaPuerta).subscribe((respuesta: any) => {
      this.vistaActual = 'listar';
      this.cargarPuertas();
      // Registrar la acción de la puerta (Apertura o Cierre)
      const registro = {
        puerta: respuesta._id,
        accion: this.accion,
        hora: this.hora
      };

      this.puertaService.registrarPuerta(registro).subscribe(() => {
        this.cargarPuertas(); // Recargar la lista de puertas después de la creación
        this.vistaActual = 'listar';
        this.limpiarFormulario(); // Limpiar formulario después de registrar
      });
    });
  }

  // Método para actualizar la puerta
  actualizarPuerta(): void {
    // Primero, restablecer el mensaje de error
    this.errorMessage = '';

    // Validación para la ubicación
    if (!this.validarUbicacion(this.nuevaPuerta.ubicacion)) {
      this.errorMessage = 'La ubicación solo puede contener letras y espacios.';
      return;
    }

    this.puertaService.actualizarPuerta(this.puertaActual._id, this.nuevaPuerta).subscribe(() => {
      this.vistaActual = 'listar';
      this.cargarPuertas();
      this.limpiarFormulario(); // Limpiar formulario después de actualizar
    });
  }

  // Método para eliminar la puerta
  eliminarPuerta(): void {
    this.puertaService.eliminarPuerta(this.puertaActual._id).subscribe(() => {
      this.vistaActual = 'listar';
      this.cargarPuertas();
    });
  }

  // Método para editar la puerta seleccionada
  editarPuerta(): void {
    if (this.puertaActual) {
      this.nuevaPuerta = { ...this.puertaActual };
      this.vistaActual = 'crear';
    }
  }

  // Método para validar que la ubicación solo contenga letras y espacios
  validarUbicacion(ubicacion: string): boolean {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(ubicacion);
  }

  // Método para formatear la hora en el formato DD-MM-YY, HH:MM:SS
  formatearHora(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString().slice(2);
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    return `${dia}-${mes}-${año}, ${hora}:${minutos}:${segundos}`;
  }

  // Limpiar el formulario y los mensajes de error
  limpiarFormulario(): void {
    this.nuevaPuerta = { ubicacion: '', estado: 'abierta' };
    this.errorMessage = '';
    this.hora = this.formatearHora(new Date());
  }
}
