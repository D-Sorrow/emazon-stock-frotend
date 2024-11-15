import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IBrand } from 'src/app/core/models/IBrand';
import { FormType } from 'src/app/shared/enum/form-type.enum';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { Field } from 'src/app/shared/utils/Fields';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {


  dataForm!: DataForm;
  brand!: IBrand;
  pagesSize = 0;
  currentPage = 0;
  brands: DataForm[] = [];

  formType: FormType = FormType.BRAND;

  fields: Field[] = [
    {
      label: '',
      formControlName: 'name',
      type: inputType.TEXT,
      placeholder: '',
      validators: [Validators.required, Validators.maxLength(50)],
    },
    {
      label: '',
      formControlName: 'description',
      type: inputType.TEXTAREA,
      placeholder: '',
      validators: [Validators.required, Validators.maxLength(90)],
    },
  ];

  constructor( private brandService: BrandService) { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable(){
    this.brandService.getAllBrands(0, 'asc').subscribe((response) => {
      console.log('Brands:', response);
      this.brands = this.mapBrandsToDataForm(response.collection);
      this.pagesSize = response.pageSize;
    });
  }

  saveData(dataForm: DataForm): void  {
    const brand: IBrand = this.mapDataFormToBrand(dataForm);
    this.brandService.addBrand(brand).subscribe(response => {
      console.log('Brand added successfully!');
    });
  }

  nextPage() {
    if(this.currentPage < this.pagesSize){
      this.currentPage++;
      console.log('Página actual:', this.currentPage);
      this.brandService.getAllBrands(this.currentPage, 'asc').subscribe(
        response => {
          this.brands = this.mapBrandsToDataForm(response.collection);
          console.log('Marcas cargadas:', this.brands);
        },
        error => {
          console.error('Error al cargar las Marcas:', error);
        }
      );
    }
    
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.brandService.getAllBrands(this.currentPage, 'asc').subscribe(
      response => {
        this.brands = this.mapBrandsToDataForm(response.collection);
        console.log('Marcas cargadas:', this.brands);
      },
      error => {
        console.error('Error al cargar las Marcas:', error);
      }
    );
    console.log('Página actual:', this.currentPage);
  }

  mapDataFormToBrand(dataForm: DataForm): IBrand {
    return {
      brandName: dataForm.name,
      brandDescription: dataForm.description,
    };
  }

  mapBrandsToDataForm(brands: IBrand[]): DataForm[] {
    return brands.map(brand => ({
      name: brand.brandName,
      description: brand.brandDescription,
    }));
  }

}
