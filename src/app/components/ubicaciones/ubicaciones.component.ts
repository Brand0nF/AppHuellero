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
  hora: string = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }); // Hora actual por defecto

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

  registrarPuerta(): void {
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
        // Recargar la lista de puertas después de la creación
        this.cargarPuertas();
        // Redirigir a la vista de lista
        this.vistaActual = 'listar';
      });
    });
  }

  actualizarPuerta(): void {
    this.puertaService.actualizarPuerta(this.puertaActual._id, this.nuevaPuerta).subscribe(() => {
      this.vistaActual = 'listar';
      this.cargarPuertas(); // Recargar la lista de puertas después de la actualización
    });
  }

  eliminarPuerta(): void {
    this.puertaService.eliminarPuerta(this.puertaActual._id).subscribe(() => {
      this.vistaActual = 'listar';
      this.cargarPuertas(); // Recargar la lista de puertas después de la eliminación
    });
  }

  limpiarFormulario(): void {
    this.nuevaPuerta = { ubicacion: '', estado: 'abierta' };
    this.puertaActual = null;
    this.accion = 'Apertura';
    this.hora = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
  }

  editarPuerta(): void {
    this.nuevaPuerta = { ubicacion: this.puertaActual.ubicacion, estado: this.puertaActual.estado };
    this.vistaActual = 'crear';
  }
}
