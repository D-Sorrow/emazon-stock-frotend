import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { LogoComponent } from './logo/logo.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TitleComponent } from './title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    LogoComponent,
    TableCellComponent,
    TitleComponent,

  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    LogoComponent,
    TableCellComponent,
    TitleComponent,
    
  ]
})
export class AtomsModule { }
