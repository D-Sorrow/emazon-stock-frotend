import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the internal value', () => {
    component.writeValue('Test Value');
    expect(component.value).toBe('Test Value');
  });

  it('should register the onChange function', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    component.onChange(['Test']);
    expect(mockFn).toHaveBeenCalledWith(['Test']);
  });

  it('should register the onTouched function', () => {
    const mockFn = jest.fn();
    component.registerOnTouched(mockFn);
    component.onTouched();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should emit valueChange event on selection change', () => {
    const mockEmitter = jest.spyOn(component.valueChange, 'emit');
    const mockEvent = {
      target: { value: 'Test Value' },
    } as unknown as Event;

    component.onSelectChange(mockEvent);
    expect(mockEmitter).toHaveBeenCalledWith('Test Value');
  });

  it('should return AUX_BODEGA for "Auxiliar de bodega"', () => {
    const result = component.setValueToSelect('Auxiliar de bodega');
    expect(result).toBe('AUX_BODEGA');
  });

  it('should return an empty string for any other value', () => {
    const result = component.setValueToSelect('Other Value');
    expect(result).toBe('');
  });
});
