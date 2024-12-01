import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PuertaService } from './../../services/puerta.service'; // Servicio para interactuar con puertas
import { AccesoService } from './../../services/accesos.service'; // Servicio para interactuar con accesos
import { UsuariosService } from './../../services/usuarios.service'; // Servicio para interactuar con usuarios

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos solo las dependencias necesarias
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css'],
})
export class AccesosComponent implements OnInit {
  vistaActual: string = 'listar'; // Controla la vista: listar o simulacion
  accesos: any[] = []; // Lista de accesos registrados
  puertas: any[] = []; // Lista de puertas
  usuarios: any[] = []; // Lista de usuarios obtenidos de la API
  nuevoAcceso = {
    usuario: '', // ID del usuario
    puerta: '', // ID de la puerta
    accesoPermitido: false, // Se establece como falso hasta que se valide la clave
    tipoAcceso: 'entrada', // Tipo de acceso (entrada/salida)
    clave: '', // Clave personalizada ingresada por el usuario
    horaAcceso: '', // Se generará automáticamente
  };

  constructor(
    private puertaService: PuertaService,
    private accesoService: AccesoService,
    private usuarioService: UsuariosService, // Servicio para usuarios
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarAccesos();
    this.cargarPuertas();
    this.cargarUsuarios(); // Obtener usuarios desde la API
  }

  cargarAccesos(): void {
    this.accesoService.listarAccesos().subscribe((accesos) => {
      this.accesos = accesos;
    });
  }

  cargarPuertas(): void {
    this.puertaService.listarPuertas().subscribe((puertas) => {
      this.puertas = puertas;
    });
  }

  cargarUsuarios(): void {
    // Recuperar los usuarios desde la API (deberías tener un servicio para obtener estos datos)
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  verificarClaveYRegistrarAcceso(): void {
    const usuario = this.usuarios.find(
      (usuario) => usuario._id === this.nuevoAcceso.usuario
    );
  
    if (usuario && usuario.clavePersonalizada) {
      if (this.nuevoAcceso.clave === usuario.clavePersonalizada) {
        // Si la clave es correcta, permitir acceso
        this.nuevoAcceso.accesoPermitido = true; // Establecer acceso permitido en true
  
        // Generar la hora actual en el formato requerido
        const ahora = new Date();
        const horaAcceso = ahora
          .toLocaleString('es-CL', { timeZone: 'America/Santiago' })
          .replace(',', '');
  
        // Verificar la fecha antes de enviarla
        console.log('Fecha de acceso antes de enviar:', horaAcceso);
  
        // Completar los datos del acceso
        const acceso = {
          ...this.nuevoAcceso,
          horaAcceso: horaAcceso, // Asegurarse de que la hora esté actualizada
        };
  
        // Registrar el acceso
        this.accesoService.registrarAcceso(acceso).subscribe(
          (respuesta) => {
            console.log('Acceso registrado:', respuesta);
            this.cargarAccesos();
            this.vistaActual = 'listar';
            this.limpiarFormulario();
          },
          (error) => {
            console.error('Error al registrar el acceso:', error);
            console.error('Detalles del error:', error.error); // Muestra los detalles del error
          }
        );
      } else {
        alert('Clave incorrecta. Acceso denegado.');
      }
    } else {
      alert('Usuario no encontrado o clave no disponible.');
    }
  }
  

  limpiarFormulario(): void {
    this.nuevoAcceso = {
      usuario: '',
      puerta: '',
      accesoPermitido: false,
      tipoAcceso: 'entrada',
      clave: '',
      horaAcceso: '',
    };
  }
}
