import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit {

  @Input() userType: string[] = [];
  @Output() valueChange = new EventEmitter<string>(); // Emite el valor seleccionado.

  value!: string;
  disabled: boolean = false;

  onChange: (value: string[]) => void = () => undefined;
  onTouched: () => void = () => undefined;

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement; 
    const selectedValue = target.value; 
    this.valueChange.emit(selectedValue); 
  }

  setValueToSelect(value: string): string {
      if (value === 'Auxiliar de bodega'){
        return 'AUX_BODEGA';
      }
      return '';
  }

}
