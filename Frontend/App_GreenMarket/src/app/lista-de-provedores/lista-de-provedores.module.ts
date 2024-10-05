import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeProvedoresPageRoutingModule } from './lista-de-provedores-routing.module';

import { ListaDeProvedoresPage } from './lista-de-provedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeProvedoresPageRoutingModule
  ],
  declarations: [ListaDeProvedoresPage]
})
export class ListaDeProvedoresPageModule {}
