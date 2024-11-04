// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admin/register'; // Cambia este URL según la dirección de tu API

  constructor(private http: HttpClient) {}

  // Método para el registro de administrador
  register(adminData: { nombre: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData);
  }

  // Método para el login de administrador
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Almacena el token en localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
