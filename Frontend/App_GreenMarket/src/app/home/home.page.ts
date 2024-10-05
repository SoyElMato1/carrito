import { Component, OnInit } from '@angular/core';
import { CarritoServiService } from '../Servicios/Carrito/carrito-servi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cartItemCount: number = 0;

  constructor(private cartService: CarritoServiService ) {}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
