import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  ok: boolean;
  admin: {
    nombre: string;
    email: string;
    uid: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admin/login';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(nombre: string, email: string, password: string): Observable<LoginResponse> {
    const body = { nombre, email, password };
    return this.http.post<LoginResponse>(this.apiUrl, body);
  }

  // Método para cerrar sesión
  logout(): void {
    // Elimina el token de autenticación almacenado en el localStorage
    localStorage.removeItem('authToken');
    console.log('Sesión cerrada correctamente.');
  }

  // Método opcional para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Comprueba si existe un token
  }
}
