import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class UsuarioComponent {
  usuarios: { 
    nombre: string; 
    rut: string; 
    fechaNacimiento: Date; 
    huellaDigital: string; 
    clavePersonalizada: string; 
  }[] = []; // Define el tipo de datos en línea
  errorMessage: string = ''; // Para mostrar mensajes de error

  constructor(private authService: AuthService) {} // Inyecta AuthService

  agregarUsuarioForm(usuarioForm: any) {
    const usuario = {
      nombre: usuarioForm.value.nombre,
      rut: usuarioForm.value.rut,
      fechaNacimiento: new Date(usuarioForm.value.fechaNacimiento),
      huellaDigital: usuarioForm.value.huellaDigital,
      clavePersonalizada: usuarioForm.value.clavePersonalizada,
    };

    // Enviar datos al servicio
    this.authService.registerUsuario(usuario).subscribe({
      next: () => {
        this.usuarios.push(usuario); // Agrega el usuario localmente si la API responde correctamente
        usuarioForm.reset(); // Reiniciar el formulario
      },
      error: (error) => {
        this.errorMessage = 'Error al agregar usuario';
        console.error(error); // Muestra el error en consola
      }
    });
  }
}
