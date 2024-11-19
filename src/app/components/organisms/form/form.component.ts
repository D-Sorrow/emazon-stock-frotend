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
export class FormComponent implements OnInit {


  @Input() formType!: FormType;
  @Input() fields: Field[]  = [];
  @Input() categories!: DataForm[];
  @Input() brands!: DataForm[];
  @Input() formTitle: string = 'Form Title';
  @Input() typeUser!: string[];
  @Output() formSubmitted = new EventEmitter<DataForm>();
  @Output() scrollDown = new EventEmitter<multiSelectType>();
  buttonTitle: string = 'Guardar';
  placeholderName: string = '';
  placeholderDescription: string = '';
  placeholderQuantity: string = '';
  placeholderPrice: string = '';
  labelName: string = '';
  labelDescription: string = '';
  labelQuantity: string = '';
  labelPrice: string = '';
  inputNumber: inputType = inputType.NUMBER;
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
    if (this.formType === FormType.CATEGORY) {
      this.formTitle = 'Añade una categoría';
      this.placeholderName = 'Ingresa el nombre de la categoría';
      this.placeholderDescription = 'Ingresa una descripción para la categoría';
      this.labelName = 'Nombre de la categoría';
      this.labelDescription = 'Descripción de la categoría';
    } else if (this.formType === FormType.BRAND) {
      this.formTitle = 'Añade una marca';
      this.placeholderName = 'Ingresa el nombre de la marca';
      this.placeholderDescription = 'Ingresa una descripción para la marca';
      this.labelName = 'Nombre de la marca';
      this.labelDescription = 'Descripción de la marca';
    } else if (this.formType === FormType.ARTICLE) {
      this.formTitle = 'Añade un artículo';
      this.placeholderName = 'Ingresa el nombre del artículo';
      this.placeholderDescription = 'Ingresa una descripción para el artículo';
      this.placeholderQuantity = 'Numero de artículos a ingresar';
      this.placeholderPrice = 'Precio del artículo';
      this.labelName = 'Nombre del artículo';
      this.labelDescription = 'Descripción del artículo';
      this.labelQuantity = 'Cantidad';
      this.labelPrice = 'Precio';
    }
  }

  handleButtonClick(){
    if(!this.formGroup.valid){
    }else{
      const dataForm: DataForm = {
        name: this.formGroup.get('name')?.value,
        description: this.formGroup.get('description')?.value,
        price: this.formGroup.get('price')?.value,
        quantity: this.formGroup.get('quantity')?.value,
        categoryList: this.formGroup.get('categories')?.value,
        brand: this.formGroup.get('brands')?.value,
      };

      this.formSubmitted.emit(dataForm);
      this.formGroup.reset();
    }
  }

  onScrollDown(typeSelect: multiSelectType){
    this.scrollDown.emit(typeSelect);
  }

  onSelectedItemsChange(selectedItems: string[]): void {
    this.formGroup.get('categories')?.setValue(selectedItems);
  }
}


