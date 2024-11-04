import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Usuario {
  nombre: string;
  rut: string;
  fechaNacimiento: Date;
  huellaDigital: string;
  clavePersonalizada: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [FormsModule] // Importa FormsModule
})
export class UsuarioComponent {
  usuarios: Usuario[] = []; // Define el tipo de datos

  agregarUsuarioForm(usuarioForm: any) {
    const usuario: Usuario = {
      nombre: usuarioForm.value.nombre,
      rut: usuarioForm.value.rut,
      fechaNacimiento: new Date(usuarioForm.value.fechaNacimiento),
      huellaDigital: usuarioForm.value.huellaDigital,
      clavePersonalizada: usuarioForm.value.clavePersonalizada,
    };
    
    this.agregarUsuario(usuario);
    usuarioForm.reset(); // Opcional: reiniciar el formulario
  }

  agregarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }
}
