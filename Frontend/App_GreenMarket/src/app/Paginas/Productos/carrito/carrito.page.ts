import { Component, OnInit } from '@angular/core';
import { CarritoServiService } from '../../../Servicios/Carrito/carrito-servi.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cartItems: any[] = [];
  total = 0;
  customer = { rut: '', dv: '', correo_electronico: '', nombre: '', direccion: '' };

  constructor(private cartService: CarritoServiService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.ver_carrito().subscribe((data: any) => {
      this.cartItems = data.items.map((item: any) => ({
        producto_id: item.producto_id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.subtotal
      }));
      this.total = data.total;
    }, error => {
      console.error('Error al cargar el carrito:', error);
    });
  }

  removeItem(productId: number) {
    this.cartService.restar_carrito(productId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {
    this.cartService.checkout(this.customer).subscribe((response: any) => {
      console.log(response.mensaje);
      // Redirigir a la página de pago de Transbank
      // window.location.href = `http://localhost:8000/iniciar_pago/${response.orden_id}/`;
    });
  }

}
