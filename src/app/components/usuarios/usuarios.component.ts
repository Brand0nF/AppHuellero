import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true, // Indica que es un componente independiente
  imports: [FormsModule, CommonModule], // Agregar CommonModule aquí
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario: any = {
    nombre: '',
    rut: '',
    fechaNacimiento: '',
    huellaDigital: '',
    clavePersonalizada: '',
  };
  usuarioActual: any = null;
  vistaActual: string = 'listar';
  errorMessage: string = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  registrarUsuario() {
    // Validaciones
    if (!this.validarNombre(this.nuevoUsuario.nombre)) {
      this.errorMessage = 'El nombre solo puede contener letras y espacios.';
      return;
    }

    if (!this.validarRut(this.nuevoUsuario.rut)) {
      this.errorMessage = 'RUT inválido. Debe seguir el formato XX.XXX.XXX-X';
      return;
    }

    if (!this.validarFechaNacimiento(this.nuevoUsuario.fechaNacimiento)) {
      this.errorMessage = 'La persona debe ser mayor de edad.';
      return;
    }

    if (!this.validarHuellaDigital(this.nuevoUsuario.huellaDigital)) {
      this.errorMessage = 'La huella digital debe estar en el formato "huellaX" (X es un número).';
      return;
    }

    this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe(() => {
      this.obtenerUsuarios();
      this.vistaActual = 'listar';
      this.limpiarFormulario();
      this.errorMessage = ''; // Limpiar el mensaje de error
    });
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioActual = { ...usuario };
    this.vistaActual = 'detalles';
  }

  editarUsuario() {
    if (this.usuarioActual) {
      this.nuevoUsuario = { ...this.usuarioActual };
      this.vistaActual = 'crear';
    }
  }

  actualizarUsuario() {
    // Validaciones antes de actualizar
    if (!this.validarNombre(this.nuevoUsuario.nombre)) {
      this.errorMessage = 'El nombre solo puede contener letras y espacios.';
      return;
    }

    if (!this.validarRut(this.nuevoUsuario.rut)) {
      this.errorMessage = 'RUT inválido. Debe seguir el formato XX.XXX.XXX-X';
      return;
    }

    if (!this.validarFechaNacimiento(this.nuevoUsuario.fechaNacimiento)) {
      this.errorMessage = 'La persona debe ser mayor de edad.';
      return;
    }

    if (!this.validarHuellaDigital(this.nuevoUsuario.huellaDigital)) {
      this.errorMessage = 'La huella digital debe estar en el formato "huellaX" (X es un número).';
      return;
    }

    if (this.usuarioActual && this.usuarioActual._id) {
      this.usuariosService
        .actualizarUsuario(this.usuarioActual._id, this.nuevoUsuario)
        .subscribe(() => {
          this.obtenerUsuarios();
          this.vistaActual = 'listar';
          this.limpiarFormulario();
          this.errorMessage = ''; // Limpiar el mensaje de error después de la actualización
        });
    }
  }

  eliminarUsuario() {
    if (this.usuarioActual && this.usuarioActual._id) {
      this.usuariosService.eliminarUsuario(this.usuarioActual._id).subscribe(() => {
        this.obtenerUsuarios();
        this.vistaActual = 'listar';
      });
    }
  }

  limpiarFormulario() {
    this.nuevoUsuario = {
      nombre: '',
      rut: '',
      fechaNacimiento: '',
      huellaDigital: '',
      clavePersonalizada: '',
    };
    this.usuarioActual = null;
  }

  // Validaciones
  validarNombre(nombre: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
    return regex.test(nombre);
  }

  validarRut(rut: string): boolean {
    // Formato RUT: 12.345.678-9
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/; // Expresión regular para validar el RUT con puntos y guion
    return rutRegex.test(rut);
  }

  validarFechaNacimiento(fecha: string): boolean {
    const fechaNacimiento = new Date(fecha);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad >= 18;
  }

  validarHuellaDigital(huella: string): boolean {
    const regex = /^huella\d+$/; // Formato huellaX donde X es un número
    return regex.test(huella);
  }
}
