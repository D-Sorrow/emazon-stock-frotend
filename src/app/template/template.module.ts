import { NgModule } from '@angular/core';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { OrganismsModule } from '../components/organisms/organisms.module';




@NgModule({
  declarations: [AdminTemplateComponent],
  imports: [
    SharedModule,
    OrganismsModule,
    AppRoutingModule,
],
  exports: [AdminTemplateComponent]
})
export class TemplateModule { }
