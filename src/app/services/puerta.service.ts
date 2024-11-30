import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuertaService {
  private apiUrl = 'http://localhost:3000/api';  // Cambia la URL según corresponda

  constructor(private http: HttpClient) {}

  listarPuertas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/puertas`);
  }

  crearPuerta(puerta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/puertas`, puerta);
  }

  actualizarPuerta(id: string, puerta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/puertas/${id}`, puerta);
  }

  eliminarPuerta(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/puertas/${id}`);
  }

  registrarPuerta(registro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registroPuertas`, registro);
  }
}
