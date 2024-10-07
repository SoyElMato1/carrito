import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/Interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiService {

  private apiUrl = 'http://127.0.0.1:8000/modelo/';


  // BehaviorSubject to track number of items in the cart
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }



  // ver_carrito(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}`);
  // }


  ver_carrito(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/modelo/carrito/'); // Asegúrate de que la URL sea correcta
}

agregar_carrito(productoId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}agregar/${productoId}`).pipe(  // Cambiado a GET
    tap(() => {
      this.ver_carrito(); // Cargar el carrito después de agregar un producto
    })
  );
}




  checkout(data: any) {
    const headers = { 'Content-Type': 'application/json' }; // Asegúrate de tener las cabeceras
    return this.http.post('http://127.0.0.1:8000/modelo/checkout/', data, { headers });
  }


  // Getter for the cart item count observable
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  // Method to update the cart item count
  updateCartCount() {
    this.ver_carrito();
  }

   // Implementación del método restar_carrito
   restar_carrito(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/restar_carrito`, { productId });
  }

  listarProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}productos/`);
  }
}
