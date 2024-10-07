import { Component, OnInit } from '@angular/core';
import { CarritoServiService } from '../Servicios/Carrito/carrito-servi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cartItemCount: number = 0;

  constructor(private cartService: CarritoServiService,
              private router : Router
   ) {}
   lista_de_provedores(){
    this.router.navigate(['/proveedor'])
  }
  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
