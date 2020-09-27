import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearHorarioPageRoutingModule } from './crear-horario-routing.module';

import { CrearHorarioPage } from './crear-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearHorarioPageRoutingModule
  ],
  declarations: [CrearHorarioPage]
})
export class CrearHorarioPageModule {}
