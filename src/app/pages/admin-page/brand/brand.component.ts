import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IBrand } from 'src/app/core/models/IBrand';
import { FormType } from 'src/app/shared/enum/form-type.enum';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { Field } from 'src/app/shared/utils/Fields';
import { ToastService } from 'src/app/shared/service/toast/toast.service';

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

  sortField: string = 'asc';

  formType: FormType = FormType.BRAND;

  fields: Field[] = [
    {
      label: 'Nombre de la marca',
      formControlName: 'brandName',
      type: inputType.TEXT,
      placeholder: 'Ingresa el nombre de la marca',
      validators: [Validators.required, Validators.maxLength(50)],
    },
    {
      label: 'Descripción de la marca',
      formControlName: 'brandDescription',
      type: inputType.TEXTAREA,
      placeholder: 'Ingresa la descripción de la marca',
      validators: [Validators.required, Validators.maxLength(90)],
    },
  ];

  constructor( private brandService: BrandService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable(){
    this.brandService.getAllBrands(0, 'asc').subscribe((response) => {
      this.brands = this.mapBrandsToDataForm(response.collection);
      this.pagesSize = response.pageSize;
    });
  }

  saveData(dataForm: IBrand): void  {
    this.brandService.addBrand(dataForm).subscribe({
      next: (response) => {
        this.toastService.showToast('Marca agregada!', 'success');
      },
      error: (err) => {
        this.toastService.showToast('Ups algo salió mal.', 'error');
      },
    });
  }

  nextPage() {
    if(this.currentPage < this.pagesSize){
      this.currentPage++;
      this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
        response => {
          this.brands = this.mapBrandsToDataForm(response.collection);
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
    this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
      response => {
        this.brands = this.mapBrandsToDataForm(response.collection);
      },
      error => {
        console.error('Error al cargar las Marcas:', error);
      }
    );
  }

  sortItem(){

    if(this.sortField === 'asc'){
      this.sortField = 'desc';
    }else{
      this.sortField = 'asc';
    }
    
    this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
      response => {
        this.brands = this.mapBrandsToDataForm(response.collection);
      }
    )

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
