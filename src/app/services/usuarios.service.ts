import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }

  // Actualizar un usuario existente
  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
