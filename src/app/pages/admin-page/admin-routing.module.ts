import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { ArticleComponent } from './article/article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTemplateComponent,
    children: [
      {
        path:'categoria',
        component: CategoryComponent,
      },
      {
        path:'marca',
        component: BrandComponent,
      },
      {
        path:'articulo',
        component: ArticleComponent,
      },
      {
        path:'lista-articulos',
        component: ListArticlesComponent,
      },
      {
        path:'usuario',
        component: UserComponent,
      }
      
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
