import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CoinsComponent } from './coins.component';

@NgModule({
  declarations: [CoinsComponent],
  exports: [CoinsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class CoinsModule { }
