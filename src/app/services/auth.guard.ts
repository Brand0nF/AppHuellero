import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;  // Si el token existe, el usuario puede continuar a la ruta
    } else {
      // Si no hay token, redirigir al login con un parámetro de error
      this.router.navigate(['/login'], { queryParams: { error: 'No autorizado' } });
      return false;
    }
  }
}
