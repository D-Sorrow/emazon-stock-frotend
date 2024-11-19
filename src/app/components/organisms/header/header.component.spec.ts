import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ FontAwesomeModule ]  
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu state and change the icon', () => {
    expect(component.isMenuOpen).toBe(false);
    expect(component.icon).toBe(faBars);

    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    expect(component.icon).toBe(faTimes);

    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
    expect(component.icon).toBe(faBars);
  });
});
