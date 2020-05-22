import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryFilterPage } from './category-filter.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryFilterPageRoutingModule {}
