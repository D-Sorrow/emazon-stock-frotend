import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { multiSelectType } from 'src/app/shared/enum/multiSelect-type.enum';
import { DataForm } from 'src/app/shared/utils/DataForm';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectComponent],
      imports: [FormsModule, ReactiveFormsModule],
    })
    .compileComponents();

    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    component.typeSelect = multiSelectType.CATEGORY;
    component.items = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
      { id: 3, name: 'Item 3', description: 'Description 3' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedValues and value when writeValue is called', () => {
    const testValues: string[] = ['1', '2', '3'];

    component.writeValue(testValues);

    expect(component.selectedValues).toEqual(testValues);
    expect(component.value).toEqual(testValues);
  });

  it('should not update selectedValues and value when writeValue is called with null', () => {
    component.writeValue([]);

    expect(component.selectedValues).toEqual([]);
    expect(component.value).toEqual([]);
  });

  it('should register onChange function correctly', () => {
    const mockOnChange = jest.fn();
    
    component.registerOnChange(mockOnChange);
    
    expect(component.onChange).toBe(mockOnChange);
  });

  it('should call onChange function when it is called', () => {
    const mockOnChange = jest.fn();
    component.registerOnChange(mockOnChange);

    const testValue: string[] = ['1', '2', '3'];
    component.onChange(testValue);

    expect(mockOnChange).toHaveBeenCalledWith(testValue);
  });

  it('should register onTouched function correctly', () => {
    const mockOnTouched = jest.fn();
    
    component.registerOnTouched(mockOnTouched);
    
    expect(component.onTouched).toBe(mockOnTouched);
  });

  it('should call onTouched function when it is called', () => {
    const mockOnTouched = jest.fn();
    component.registerOnTouched(mockOnTouched);

    component.onTouched();

    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should add id to selectedItem if not already present', () => {
    component.selectedItem = [];

    component.getValueToCategory(1);

    expect(component.selectedItem).toContain(1);
  });

  it('should add item to selectedValues when not already selected', () => {
    const id = 1;
    component.selectedValues = [];
    
    component.onSelectionChange(id);
    
    expect(component.selectedValues).toContain(id.toString());
  });

  it('should remove item from selectedValues when already selected', () => {
    const id = 1;
    component.selectedValues = [id.toString()];
    
    component.onSelectionChange(id);
    
    expect(component.selectedValues).not.toContain(id.toString());
  });

  it('should emit selectedChange with updated selectedValues', () => {
    const id = 1;
    const mockEmit = jest.fn();
    component.selectedChange.emit = mockEmit;
    component.selectedValues = [];
    
    component.onSelectionChange(id);
    
    expect(mockEmit).toHaveBeenCalledWith([id.toString()]);
  });

  it('should remove id from selectedItem if already present', () => {
    component.selectedItem = [1];

    component.getValueToCategory(1);

    expect(component.selectedItem).not.toContain(1);
  });

  it('should block checkboxes based on typeSelect and selectedItem length', () => {
    component.selectedItem = [1, 2, 3];
    expect(component.blockCheckboxCategory(4)).toBeTruthy;
    component.typeSelect = multiSelectType.BRAND;
    component.selectedItem = [1];
    expect(component.blockCheckboxCategory(2)).toBeTruthy;
  });

  it('should disable the component when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should enable the component when setDisabledState is called with false', () => {
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

});
