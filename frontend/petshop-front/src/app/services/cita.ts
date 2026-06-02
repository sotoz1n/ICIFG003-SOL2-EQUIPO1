import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos una interfaz sencilla para representar la Cita
export interface Cita {
  id?: number;
  nombrePaciente: String;
  correo: String;
  tratamiento: String;
  fecha: string;
  hora: string;
  usuario: { id: number }; // Aquí cumplimos con el @ManyToOne del Backend
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) { }

  listarCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  agendarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  eliminarCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}