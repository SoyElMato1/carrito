import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProvedorServiService {
  private baseUrl = 'http://127.0.0.1:8000/modelo/provee/';  // URL de tu API en el backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los proveedores
  getProveedores(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

}
