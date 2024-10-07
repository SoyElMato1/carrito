import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoProductoPageRoutingModule } from './catalogo-producto-routing.module';

import { CatalogoProductoComponent } from './catalogo-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoProductoPageRoutingModule
  ],
  declarations: [CatalogoProductoComponent]
})
export class CatalogoProductoPageModule {}
