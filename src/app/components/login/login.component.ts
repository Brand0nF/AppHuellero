import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.nombre, this.email, this.password).subscribe({
      next: (response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']); // Redirige al home después del inicio de sesión
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    });
  }
}  
