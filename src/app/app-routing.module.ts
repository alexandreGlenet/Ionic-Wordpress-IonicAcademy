import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "posts",
    pathMatch: "full",
  },
  {
    path: "posts",
    loadChildren: () =>
      import("./pages/posts/posts.module").then((m) => m.PostsPageModule),
  },
  {
    path: "account",
    loadChildren: () =>
      import("./pages/account/account.module").then((m) => m.AccountPageModule),
  },
  {
    path: "posts/:id",
    loadChildren: () =>
      import("./pages/post-details/post-details.module").then(
        (m) => m.PostDetailsPageModule
      ),
  },
  {
    path: 'category-filter',
    loadChildren: () => import('./pages/category-filter/category-filter.module').then( m => m.CategoryFilterPageModule)
  },
  {
    path: 'page/:id',
    loadChildren: () => import('./pages/wp-page/wp-page.module').then( m => m.WpPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
