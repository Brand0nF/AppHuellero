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
    this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe(() => {
      this.obtenerUsuarios();
      this.vistaActual = 'listar';
      this.limpiarFormulario();
    });
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioActual = { ...usuario }; // Copiar para evitar modificar directamente
    this.vistaActual = 'detalles';
  }

  editarUsuario() {
    if (this.usuarioActual) {
      this.nuevoUsuario = { ...this.usuarioActual }; // Cargar datos del usuario en el formulario
      this.vistaActual = 'crear'; // Cambiar a la vista del formulario
    }
  }

  actualizarUsuario() {
    if (this.usuarioActual && this.usuarioActual._id) {
      this.usuariosService
        .actualizarUsuario(this.usuarioActual._id, this.nuevoUsuario)
        .subscribe(() => {
          this.obtenerUsuarios();
          this.vistaActual = 'listar';
          this.limpiarFormulario();
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
}
