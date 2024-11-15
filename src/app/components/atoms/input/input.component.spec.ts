import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule], // Importa los módulos necesarios
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.placeholder).toBe('');
    expect(component.type).toBe('');
    expect(component.required).toBe(false);
    expect(component.isTextarea).toBe(false);
    expect(component.value).toBe('');
    expect(component.disabled).toBe(false);
  });
  
  it('should write value correctly', () => {
    const value = 'Test Value';
    component.writeValue(value);
    expect(component.value).toBe(value);
  });

  it('should set value using writeValue', () => {
    component.writeValue('New Value');
    fixture.detectChanges();
    expect(component.value).toBe('New Value');
  });

  it('should disable input when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.disabled).toBe;
  });

  it('should handle textarea input correctly', () => {
    component.isTextarea = true;
    fixture.detectChanges();
    const textareaElement: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement).toBeTruthy();
  });

  it('should call onChange when input changes', () => {
    const spyOnChange = jest.fn();
    component.registerOnChange(spyOnChange);

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));

    expect(spyOnChange).toHaveBeenCalledWith('New Value');
  });  

});
