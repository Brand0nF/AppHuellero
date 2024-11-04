import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {
    localStorage.removeItem('token'); // Limpia el token al hacer logout
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token
  }
}
