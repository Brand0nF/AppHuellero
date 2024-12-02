import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detecta si hay un parámetro de error en la URL y muestra el mensaje de error
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['error']) {
        this.errorMessage = 'No estás autorizado para acceder a esa página. Por favor, inicia sesión.';
      }
    });
  }

  onSubmit() {
    this.authService.login(this.nombre, this.email, this.password).subscribe({
      next: (response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token);  // Guardar el token
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';  // Se muestra un mensaje de error
      }
    });
  }
}
