import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NavBar component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct default values', () => {
    expect(component.isMenuOpen).toBe(false);
    expect(component.icon).toBe(faBars);
    expect(component.sizeButton).toBe(ComponentSize.BIG);
  });

  it('should toggle the menu and change the icon to faTimes when menu is opened', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    expect(component.icon).toBe(faTimes);
  });

  it('should toggle the menu and change the icon back to faBars when menu is closed', () => {
    component.toggleMenu(); 
    component.toggleMenu(); 
    expect(component.isMenuOpen).toBe(false);
    expect(component.icon).toBe(faBars);
  });

});
