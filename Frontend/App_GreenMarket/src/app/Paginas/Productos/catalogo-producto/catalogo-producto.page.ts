import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarritoServiService } from 'src/app/Servicios/Carrito/carrito-servi.service';
import { ProductoService } from 'src/app/Servicios/Producto/producto-servi.service';

@Component({
  selector: 'app-catalogo-producto',
  templateUrl: './catalogo-producto.page.html',
  styleUrls: ['./catalogo-producto.page.scss'],
})
export class CatalogoProductoComponent implements OnInit {
  carrito: any[] = []; // Propiedad para almacenar el carrito
  productos: any[] = [];
console: any;


  constructor(private productoService: ProductoService, private serviciocarrito: CarritoServiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  agregarAlCarrito(producto: any) {
    console.log('Producto antes de la validación:', producto); // Verifica la estructura del producto
    if (!producto || !producto.id_proveedor) {  // O usa la propiedad que sea el identificador
        console.error('Producto o ID no válido');
        alert('No se pudo agregar el producto. Inténtalo de nuevo.');
        return;
    }

    this.http.get(`http://127.0.0.1:8000/modelo/agregar/${producto.codigo_producto}`, {}).subscribe(
        (response: any) => {
            console.log('Producto agregado:', response);
            alert('Se agregó el producto al carrito'); // Notificación al usuario
        },
        (error: any) => {
            console.error('Error al agregar el producto:', error);
        }
    );
  }
}
