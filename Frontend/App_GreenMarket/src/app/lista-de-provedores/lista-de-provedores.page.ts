import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ProvedorServiService } from '../Servicios/Proveedor/provedor-servi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-provedores',
  templateUrl: './lista-de-provedores.page.html',
  styleUrls: ['./lista-de-provedores.page.scss'],
})
export class ListaDeProvedoresPage implements OnInit {


  // detalle_producto(){
  //   this.router.navigate(['/detalle-producto'])
  // }
  private generateItems() {
    const count = this.proveedores.length + 1;
    for (let i = 0; i < 50; i++) {
      this.proveedores.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 100);
  }

  proveedores: any = [];
  constructor(private proveedorService: ProvedorServiService,
              private router : Router
  ) { }

  ngOnInit() {
    this.getProveedores();
  }
  getProveedores() {
    this.proveedorService.getProveedores().subscribe(
      (data) => {
        this.proveedores = data;  // Almacena los proveedores obtenidos
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }

    );

  // En este caso es el scroll infinito


  // En este caso es el scroll infinito
}
}
