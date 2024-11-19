import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { Field } from 'src/app/shared/utils/Fields';
import { FormType } from 'src/app/shared/enum/form-type.enum';
import { DataForm } from 'src/app/shared/utils/DataForm';

@Component({
  selector: 'app-aux-bodega',
  templateUrl: './aux-bodega.component.html',
  styleUrls: ['./aux-bodega.component.scss']
})
export class AuxBodegaComponent implements OnInit {

  formType: FormType = FormType.AUX_BODEGA;

  typeUser: string[] = ['Selecciona el tipo de usuario', 'Auxiliar de bodega',];

  fields: Field[] = [
    {
      label: 'Nombre del usuario',
      formControlName: 'userName',
      type: inputType.TEXT,
      placeholder: 'Ingresa el nombre del usuario',
      validators: [Validators.required],
    },
    {
      label: 'Apellido del usuario',
      formControlName: 'userLastName',
      type: inputType.TEXT,
      placeholder: 'Ingresa el apellido del usuario',
      validators: [Validators.required],
    },
    {
      label: 'Número de identificación',
      formControlName: 'identityDocument',
      type: inputType.NUMBER,
      placeholder: 'Ingresa el número de identificación',
      validators: [Validators.required],
    },
    {
      label: 'Número de teléfono',
      formControlName: 'userPhoneNumber',
      type: inputType.TEXT,
      placeholder: 'Ingresa el número de teléfono',
      validators: [Validators.required, Validators.maxLength(13)],
    },
    {
      label: 'Fecha de nacimiento',
      formControlName: 'dateOfBirth',
      type: inputType.DATE,
      placeholder: 'Ingresa la fecha de nacimiento',
      validators: [Validators.required],
    },
    {
      label: 'Correo electrónico',
      formControlName: 'userEmail',
      type: inputType.TEXT,
      placeholder: 'Ingresa el correo electrónico',
      validators: [Validators.email],
    },
    {
      label: 'Contraseña',
      formControlName: 'userPassword',
      type: inputType.TEXT,
      placeholder: 'Ingresa la contraseña',
      validators: [Validators.email],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
