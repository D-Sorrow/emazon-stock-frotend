import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { IArticle } from 'src/app/core/models/IArticle';
import { IBrand } from 'src/app/core/models/IBrand';
import { ICategory } from 'src/app/core/models/ICategory';
import { FormType } from 'src/app/shared/enum/form-type.enum';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { multiSelectType } from 'src/app/shared/enum/multiSelect-type.enum';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { Field } from 'src/app/shared/utils/Fields';
import { ToastService } from 'src/app/shared/service/toast/toast.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {


  dataForm!: DataForm;


  formType: FormType = FormType.ARTICLE;

  categories!: DataForm[];
  brands!: DataForm[];
  categoriesSelectCount: number = 0;
  brandsSelectCount: number = 0;
  countPageCategory: number = 1;
  countPageBrand: number = 1;

  selectItemCategory: number[] = [];
  selectItemBrand: number[] = [];

  fields: Field[] = [
    {
      label: 'Nombre del artículo',
      formControlName: 'nameArticle',
      type: inputType.TEXT,
      placeholder: 'Ingresa el nombre del artículo',
      validators: [Validators.required, Validators.maxLength(50)],
    },
    {
      label: 'Descripción del artículo',
      formControlName: 'descriptionArticle',
      type: inputType.TEXTAREA,
      placeholder: 'Ingresa la descripción del artículo',
      validators: [Validators.required, Validators.maxLength(90)],
    },
    {
      label: 'Precio del artículo',
      formControlName: 'price',
      type: inputType.NUMBER,
      placeholder: 'Ingrese el precio',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      label: 'Cantidad',
      formControlName: 'stock',
      type: inputType.NUMBER,
      placeholder: 'Ingrese la cantidad',
      validators: [
        Validators.required,
        Validators.min(1),
      ],
    },
    {
      label: '',
      formControlName: 'categories',
      type: inputType.NUMBER,
      validators: [
        Validators.required
      ],
    },
    {
      label: '',
      formControlName: 'brand',
      type: inputType.NUMBER,
      validators: [
        Validators.required,
      ],
    }
  ];

  constructor(private articleService: ArticleService, private categoryService: CategoryService, 
    private brandService: BrandService , private toastService: ToastService) { }

  ngOnInit(): void {
    this.initMultiSelect();
  }

  saveData(dataForm: IArticle): void  {
    let brand = dataForm.brand? parseInt(dataForm.brand.toString()): 0;

    dataForm.brand = brand;
    this.articleService.addArticle(dataForm).subscribe({
      next: (response) => {
        this.toastService.showToast('Artículo agregado!', 'success');
      },
      error: (err) => {
        this.toastService.showToast('Ups algo salió mal.', 'error');
      },
    });
  }

  initMultiSelect() {
    
    
    this.categoryService.getAllCategories(0,'asc').subscribe(response => {
      this.categories = this.mapCategoriesToDataForm(response.collection);
      this.categoriesSelectCount = response.pageSize;
    });


    this.brandService.getAllBrands(0,'asc').subscribe(response => {
      this.brands = this.mapBrandsToDataForm(response.collection);
      this.brandsSelectCount = response.pageSize;
    });
    
  }

  chargeData(typeSelect: multiSelectType){
    if(typeSelect == multiSelectType.CATEGORY && this.countPageCategory < this.categoriesSelectCount){ 
      this.categoryService.getAllCategories(this.countPageCategory,'asc').subscribe(response => {
        this.categories = this.categories.concat(this.mapCategoriesToDataForm(response.collection));
        this.categoriesSelectCount = response.pageSize;
      });
      this.countPageCategory++;
    }else if(typeSelect == multiSelectType.BRAND && this.countPageBrand < this.brandsSelectCount) {

      this.brandService.getAllBrands(this.countPageBrand,'asc').subscribe(response => {
        this.brands = this.brands.concat(this.mapBrandsToDataForm(response.collection));
        this.brandsSelectCount = response.pageSize;
      });
      this.countPageBrand++;
    }
  }
  mapBrandsToDataForm(brands: IBrand[]): DataForm[] {
    return brands.map(brand => ({
      id: brand.brandId,
      name: brand.brandName,
      description: brand.brandDescription,
    }));
  }

  mapCategoriesToDataForm(categories: ICategory[]): DataForm[] {
    return categories.map(category => ({
      id: category.idCategory,
      name: category.nameCategory,
      description: category.descriptionCategory,
    }));
  }

}
