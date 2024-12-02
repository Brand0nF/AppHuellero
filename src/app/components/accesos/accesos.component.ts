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
    // Recuperar los usuarios desde la API
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
  
        // Generar la hora actual y formatearla
        const ahora = new Date();
        const horaAcceso = this.formatDate(ahora); // Formato de horaAcceso: DD-MM-YY, HH:MM:SS
  
        // Completar los datos del acceso
        const acceso = {
          ...this.nuevoAcceso,
          horaAcceso: horaAcceso, // Asegurarse de que la hora esté en formato correcto
        };
  
        // Verificar si la horaAcceso está correctamente agregada
        console.log('Acceso que se va a enviar:', acceso);
  
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
            if (error.error && error.error.errors) {
              console.error('Detalles del error:', error.error.errors);
              alert('Error al registrar el acceso: ' + JSON.stringify(error.error.errors));
            } else {
              alert('Error desconocido al registrar el acceso.');
            }
          }
        );
      } else {
        alert('Clave incorrecta. Acceso denegado.');
      }
    } else {
      alert('Usuario no encontrado o clave no disponible.');
    }
  }

  // Función para formatear la fecha a "DD-MM-YY, HH:MM:SS"
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Solo los últimos dos dígitos
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
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
