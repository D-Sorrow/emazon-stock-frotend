import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { LogoComponent } from './logo/logo.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TitleComponent } from './title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImgComponent } from './img/img.component';
import { ToggleComponent } from './toggle/toggle.component';
import { ErrorMessageComponent } from './error-message/error-message.component';




@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    LogoComponent,
    TableCellComponent,
    TitleComponent,
    ImgComponent,
    ToggleComponent,
    ErrorMessageComponent,

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
    ImgComponent,
    ToggleComponent,
    ErrorMessageComponent
    
  ]
})
export class AtomsModule { }
