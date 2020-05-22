import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryFilterPageRoutingModule } from './category-filter-routing.module';

import { CategoryFilterPage } from './category-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryFilterPageRoutingModule
  ],
  declarations: [CategoryFilterPage]
})
export class CategoryFilterPageModule {}
