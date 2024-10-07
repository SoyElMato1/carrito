import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from 'src/app/Interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class ProvedorServiService {
  private baseUrl = 'http://127.0.0.1:8000/modelo/provee/';  // URL de tu API en el backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los proveedores
  getProveedores(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl).pipe(
      map((productos) =>
        productos.map(producto => {
          // Puedes agregar más lógica aquí si es necesario
          return producto;
        })
      )
    );
  }
}
