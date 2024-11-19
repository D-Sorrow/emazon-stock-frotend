import { NgModule } from '@angular/core';
import { FormComponent } from "./form/form.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AtomsModule } from "../atoms/atoms.module";
import { MoleculesModule } from "../molecules/molecules.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [FormComponent, HeaderComponent, FooterComponent, TableComponent, MultiSelectComponent, CardComponent],
  imports: [
    SharedModule,
    AtomsModule,
    MoleculesModule
  ],
  exports: [FormComponent, HeaderComponent, FooterComponent, TableComponent, MultiSelectComponent, CardComponent]
})
export class OrganismsModule { }
