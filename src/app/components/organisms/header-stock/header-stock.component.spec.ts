import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { HeaderStockComponent } from './header-stock.component';

describe('HeaderStockComponent', () => {
  let component: HeaderStockComponent;
  let fixture: ComponentFixture<HeaderStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderStockComponent ],
      imports: [ FontAwesomeModule ] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleSidenav event when onToggleSidenav is called', () => {
    const spy = jest.spyOn(component.toggleSidenav, 'emit');

    component.onToggleSidenav();

    expect(spy).toHaveBeenCalled();
  });
});
