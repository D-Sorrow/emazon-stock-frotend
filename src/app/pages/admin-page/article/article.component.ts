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
    {
      label: '',
      formControlName: 'price',
      type: inputType.NUMBER,
      placeholder: 'Ingrese el precio',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      label: '',
      formControlName: 'quantity',
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
      formControlName: 'brands',
      type: inputType.NUMBER,
      validators: [
        Validators.required,
      ],
    }
  ];

  constructor(private articleService: ArticleService, private categoryService: CategoryService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.initMultiSelect();
  }

  saveData(dataForm: DataForm): void  {
    const article: IArticle = this.mapDataFormToArticle(dataForm);
    this.articleService.addArticle(article).subscribe(response => {
      console.log('Article added successfully!');
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

  mapDataFormToArticle(dataForm: DataForm): IArticle {

    return {
      nameArticle: dataForm.name,
      descriptionArticle: dataForm.description,
      stock: dataForm.quantity,
      price: dataForm.price,
      categories: dataForm.categoryList?.map(category => parseInt(category)) ? dataForm.categoryList?.map(category => parseInt(category)): this.selectItemCategory,
    };
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
