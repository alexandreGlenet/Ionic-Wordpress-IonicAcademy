import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WpPagePageRoutingModule } from './wp-page-routing.module';

import { WpPagePage } from './wp-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WpPagePageRoutingModule
  ],
  declarations: [WpPagePage]
})
export class WpPagePageModule {}
