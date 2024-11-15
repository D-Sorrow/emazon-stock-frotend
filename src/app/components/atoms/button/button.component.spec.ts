import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
import { ComponentType } from 'src/app/shared/enum/component-type.enum';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClick event when button is clicked', () => {
    const spy = jest.fn();
    
    component.buttonClick.emit = spy;

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();

    expect(spy).toHaveBeenCalled();
  });

  
});
