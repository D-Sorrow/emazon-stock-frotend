import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPageModule)
  },
  {
    path: '', 
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// , { enableTracing: true }
