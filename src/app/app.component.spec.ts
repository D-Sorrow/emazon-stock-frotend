import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderStockComponent } from './components/organisms/header-stock/header-stock.component';
import { SideNavComponent } from './components/organisms/side-nav/side-nav.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { CategoryFormComponent } from './components/molecules/category-form/category-form.component';
import { BrandFormComponent } from './components/molecules/brand-form/brand-form.component';
import { TableBrandComponent } from './components/organisms/table-brand/table-brand.component';
import { TableCategoryComponent } from './components/organisms/table-category/table-category.component';
import { ButtomComponent } from './components/atoms/buttom/buttom.component';
import { FooterStockComponent } from './components/organisms/footer-stock/footer-stock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, FontAwesomeModule, HttpClientModule
      ],
      declarations: [
        AppComponent, HeaderStockComponent, FooterStockComponent, SideNavComponent,
        TitleComponent, ButtomComponent, TableBrandComponent, TableCategoryComponent,
        CategoryFormComponent, BrandFormComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should toggle sidenav state when onToggleSidenav is called', () => {
    expect(app.isSidenavOpen).toBe(false); // Estado inicial
    app.onToggleSidenav();
    expect(app.isSidenavOpen).toBe;  // Después de llamar al método
    app.onToggleSidenav();
    expect(app.isSidenavOpen).toBe(false); // Alternar nuevamente
  });

  it('should open modal when openModal is called', () => {
    app.modalSwitch = false; // Estado inicial
    app.openModal();
    expect(app.modalSwitch).toBe(true);    // El modal debería estar abierto
  });

  it('should close modal when closeModal is called', () => {
    app.modalSwitch = true;  // Simulamos el modal abierto
    app.closeModal();
    expect(app.modalSwitch).toBe(false);   // El modal debería estar cerrado
  });

});
