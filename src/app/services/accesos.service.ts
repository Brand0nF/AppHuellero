import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private apiUrl = 'http://localhost:3000/api/accesos';  // Asegúrate de que esta sea la URL correcta

  constructor(private http: HttpClient) {}

  listarAccesos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Solicita la lista de accesos
  }

  registrarAcceso(acceso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, acceso);  // Envía los datos del acceso
  }

  obtenerAccesos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Solicita la lista de accesos nuevamente (parece redundante con listarAccesos)
  }
}
