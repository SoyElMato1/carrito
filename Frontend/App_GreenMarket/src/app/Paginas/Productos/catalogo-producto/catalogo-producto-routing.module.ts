import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoProductoComponent } from './catalogo-producto.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogoProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoProductoPageRoutingModule {}
