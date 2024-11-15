import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormType } from 'src/app/shared/enum/form-type.enum';
import { inputType } from 'src/app/shared/enum/input-type.enum';
import { Field } from 'src/app/shared/utils/Fields';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { ICategory } from 'src/app/core/models/ICategory';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  dataForm!: DataForm;
  category!: ICategory;
  pagesSize = 0;
  currentPage = 0;
  categories: DataForm[] = [];

  formType: FormType = FormType.CATEGORY; 

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


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initTable();
  }

  saveData(dataForm: DataForm): void  {
    const category: ICategory = this.mapDataFormToCategory(dataForm);
    this.categoryService.addCategory(category).subscribe(response => {
      console.log('Category added successfully!');
    });
  }

  initTable(){
    this.categoryService.getAllCategories(0, 'asc').subscribe((response) => {
      console.log('Categories:', response);
      this.categories = this.mapCategoriesToDataForm(response.collection);
      this.pagesSize = response.pageSize;
    });
  }

  nextPage() {
    if(this.currentPage < this.pagesSize){
      this.currentPage++;
      console.log('Página actual:', this.currentPage);
      this.categoryService.getAllCategories(this.currentPage, 'asc').subscribe(
        response => {
          this.categories = this.mapCategoriesToDataForm(response.collection);
          console.log('Categorías cargadas:', this.categories);
        },
        error => {
          console.error('Error al cargar las categorías:', error);
        }
      );
    }
    
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.categoryService.getAllCategories(this.currentPage, 'asc').subscribe(
      response => {
        this.categories = this.mapCategoriesToDataForm(response.collection);
        console.log('Categorías cargadas:', this.categories);
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
    console.log('Página actual:', this.currentPage);
  }

  mapDataFormToCategory(dataForm: DataForm): ICategory {
    return {
      nameCategory: dataForm.name,
      descriptionCategory: dataForm.description,
    };
  }

  mapCategoriesToDataForm(categories: ICategory[]): DataForm[] {
    return categories.map(category => ({
      name: category.nameCategory,
      description: category.descriptionCategory,
    }));
  }


}
