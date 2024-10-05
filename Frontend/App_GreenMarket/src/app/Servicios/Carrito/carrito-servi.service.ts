import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiService {

  private baseUrl = 'http://127.0.0.1:8000/modelo/';

  // BehaviorSubject to track number of items in the cart
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  agregar_carrito(productId: number) {
    return this.http.get(`${this.baseUrl}carrito/agregar/${productId}/`);
  }

  restar_carrito(productId: number) {
    return this.http.get(`${this.baseUrl}carrito/restar/${productId}/`);
  }

  ver_carrito() {
    return this.http.get(`${this.baseUrl}carrito/`);
  }

  checkout(customerData: any) {
    return this.http.post(`${this.baseUrl}checkout/`, customerData);
  }

  // Getter for the cart item count observable
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  // Method to update the cart item count
  updateCartCount() {
    this.ver_carrito();
  }
}
