import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { multiSelectType } from 'src/app/shared/enum/multiSelect-type.enum';
import { DataForm } from 'src/app/shared/utils/DataForm';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit {

  @Input() titleSelect: String = '';
    
  @Input() items: DataForm [] = [];

  @Input() typeSelect!: multiSelectType;

  @Output() scrollDown = new EventEmitter<multiSelectType>();

  @Output() toggleEvent = new EventEmitter<multiSelectType>();

  @Output() selectedChange = new EventEmitter<string[]>();


  selectedItem: number[] = [];

  selectedValues: string[] = [];
  value: string[] = [];
  disabled: boolean = false;

  onChange: (value: string[]) => void = () => undefined;
  onTouched: () => void = () => undefined;
  
  constructor() { }



  writeValue(value: string[]): void {
    if (value) {
      this.selectedValues = value;
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(id: number): void {
    if(this.selectedValues.includes(id.toString())){
      const index = this.selectedValues.indexOf(id.toString());
      if (index > -1) {
        this.selectedValues.splice(index, 1); 
      }
    }else{
      this.selectedValues.push(id.toString());
    }
  
    this.onChange(this.selectedValues);
    this.onTouched();
    this.selectedChange.emit(this.selectedValues);  
  }

  ngOnInit(): void {
    
  }

  blockCheckboxCategory(id: number): boolean {
    if(this.typeSelect == multiSelectType.CATEGORY){
      return this.selectedItem.length == 3 && !this.selectedItem.includes(id);
    }else if(this.typeSelect == multiSelectType.BRAND ){
      return this.selectedItem.length == 1 && !this.selectedItem.includes(id);
    }else{
      return false;
    }
  }

  getValueToCategory(id: number) {

    if(this.selectedItem.includes(id)) {

      const index = this.selectedItem.indexOf(id);
      this.selectedItem.splice(index, 1);

    } else {
      
      this.selectedItem.push(id);
    }

  }

  scrollDownMethod(event: Event) {
    const element = event.target as HTMLElement;
    let scrollHeight = element.scrollHeight;
    let scrollTop = element.scrollTop;
    let clientHeight = element.clientHeight;

    let scrollPosition = scrollHeight - (scrollTop + clientHeight); 

    if (Math.abs(scrollPosition) < 1) {
      this.scrollDown.emit(this.typeSelect);
    }
    
  }

}




