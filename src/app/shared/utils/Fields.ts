import { ValidatorFn } from "@angular/forms";
import { inputType } from "../enum/input-type.enum";

export interface Field {
    label: string;
    formControlName: string;
    type: inputType; 
    placeholder?: string;
    maxSelectionLimit?: number; 
    minSelectionLimit?: number;
    validators?: ValidatorFn[]; 
} 