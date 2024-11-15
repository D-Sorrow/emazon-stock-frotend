import { NgModule } from '@angular/core';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from'src/app/components/molecules/molecules.module';
import { OrganismsModule } from'src/app/components/organisms/organisms.module';
import { SharedModule } from'src/app/shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TemplateModule } from 'src/app/template/template.module';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { BrandComponent } from './brand/brand.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    CategoryComponent,
    BrandComponent,
    ArticleComponent,
  ],
  imports: [
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [
    CategoryComponent
  ]
})
export class AdminPageModule { }
