import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WpPagePage } from './wp-page.page';

const routes: Routes = [
  {
    path: '',
    component: WpPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WpPagePageRoutingModule {}
