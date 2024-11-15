import { NgModule } from '@angular/core';
import { AtomsModule } from '../atoms/atoms.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToastComponent } from './toast/toast.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ToastComponent,
    PaginationBarComponent,
  ],
  imports: [
    SharedModule,
    AtomsModule
  ],
  exports: [
    NavBarComponent,
    PaginationBarComponent
  ]
})
export class MoleculesModule { }
