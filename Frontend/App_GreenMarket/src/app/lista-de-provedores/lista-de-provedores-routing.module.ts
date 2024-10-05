import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeProvedoresPage } from './lista-de-provedores.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeProvedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeProvedoresPageRoutingModule {}
