import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtomComponent } from './components/atoms/buttom/buttom.component';
import { CategoryFormComponent } from './components/molecules/category-form/category-form.component';
import { HeaderStockComponent } from './components/organisms/header-stock/header-stock.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { FooterStockComponent } from './components/organisms/footer-stock/footer-stock.component';
import { AlertComponent } from './components/atoms/alert/alert.component';
import { TableCategoryComponent } from './components/organisms/table-category/table-category.component';
import { SideNavComponent } from './components/organisms/side-nav/side-nav.component';
import { TableBrandComponent } from './components/organisms/table-brand/table-brand.component';
import { BrandFormComponent } from './components/molecules/brand-form/brand-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtomComponent,
    CategoryFormComponent,
    HeaderStockComponent,
    TitleComponent,
    FooterStockComponent,
    AlertComponent,
    TableCategoryComponent,
    SideNavComponent,
    TableBrandComponent,
    BrandFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
