import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { FormType } from '../../../shared/enum/form-type.enum';
import { Field } from 'src/app/shared/utils/Fields';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';
import { multiSelectType } from 'src/app/shared/enum/multiSelect-type.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent<T> implements OnInit {


  @Input() formType!: FormType;
  @Input() fields: Field[]  = [];
  @Input() categories!: DataForm[];
  @Input() brands!: DataForm[];
  @Input() formTitle: string = 'Form Title';
  @Input() typeUser!: string[];
  @Output() formSubmitted = new EventEmitter<T>();
  @Output() scrollDown = new EventEmitter<multiSelectType>();
  buttonTitle: string = 'Guardar';
  messageError: string = 'Error';
  sizeButton: ComponentSize = ComponentSize.BIG;
  selectTypeCategory: multiSelectType = multiSelectType.CATEGORY;
  selectTypeBrand: multiSelectType = multiSelectType.BRAND;


  formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  initializeForm() {
    const formControls: { [key: string]: [string, ValidatorFn[]] } = {};
    this.fields.forEach((field) => {
        formControls[field.formControlName] = ['', field.validators || []];
      
    });

    this.formGroup = this.fb.group(formControls);
  }

  ngSubmit(){
    
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initComponent();
  }

  initComponent(){
    
  }

  handleButtonClick(){
    if(this.formGroup.valid){
      this.formSubmitted.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }

  onScrollDown(typeSelect: multiSelectType){
    this.scrollDown.emit(typeSelect);
  }

  onSelectedItemsChange(selectedItems: string[]): void {
    this.formGroup.get('categories')?.setValue(selectedItems);
  }

  getErrorMessage(controlName: string): boolean {

    const control = this.formGroup.get(controlName);
    if (control?.hasError('required') && control?.touched) {
      this.messageError = 'El campo es requerido';
      return true;
    }else if (control?.hasError('maxlength')) {
      this.messageError = 'No puede exceder los 50 carácteres';
      return true;
    }
    return false;
  }
  onUserRolChange(selectedValue: string) {
    this.formGroup.get('role')?.setValue(selectedValue); 
  }
}


