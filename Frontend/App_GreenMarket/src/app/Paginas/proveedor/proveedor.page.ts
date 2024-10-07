import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProvedorServiService } from 'src/app/Servicios/Proveedor/provedor-servi.service';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit {
  imageBase64: string | undefined;
  p: any;
  proveedores: any = [];

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

constructor(private proveedorService: ProvedorServiService,
              private router : Router,  private http:HttpClient
  ) { }

  getImageBase64(imageUrl: string): Observable<string> {
    return this.http.get<string>(imageUrl);  // O puede ser algún otro tipo de petición si la imagen está en la base de datos
  }
  imageUrl(imageUrl: any) {
    throw new Error('Method not implemented.');
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

    }
    catalogo_producto(){
      this.router.navigate(['/catalogo-producto'])
    }
  ngOnInit() {
    this.getProveedores();

  }

}
