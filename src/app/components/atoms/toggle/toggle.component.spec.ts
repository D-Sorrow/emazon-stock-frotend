import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { By } from '@angular/platform-browser';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit correct value when toggled', () => {
    const toggleLabel = 'Por Categoría';
    const spy = jest.spyOn(component.toggleChange, 'emit');
    
    const toggleInput = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;

    toggleInput.checked = true;
    toggleInput.dispatchEvent(new Event('change'));  

    expect(spy).toHaveBeenCalledWith([toggleLabel, true]);

    toggleInput.checked = false;
    toggleInput.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith([toggleLabel, false]);
  });

  it('should reflect the @Input() checked value', () => {
    component.checked = true;
    fixture.detectChanges();

    const toggleInput = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    
    expect(toggleInput.checked).toBe(true);
  });

  it('should display the correct label', () => {
    component.toggleLabel = 'Por Marca';
    fixture.detectChanges();

    const labelText = fixture.debugElement.query(By.css('label')).nativeElement.textContent;
    expect(labelText).toBe('Por Marca');
  });
});
