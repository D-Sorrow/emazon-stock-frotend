import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {CategoryService} from '../../../shared/service/category/category.service';
import { ICategory } from 'src/app/core/models/ICategory';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit { 
  

  @Input() textButton: string = '';

  constructor(private fb: FormBuilder, private categoryService: CategoryService ) { }


  categoryForm = this.fb.group({
    nameCategory: ['', [Validators.required, Validators.maxLength(50)]],
    descriptionCategory: ['', [Validators.required, Validators.maxLength(90)]]
  })

  get nameCategory() { return this.categoryForm.get('nameCategory') as FormControl; }
  get descriptionCategory() { return this.categoryForm.get('descriptionCategory') as FormControl; }

  submitCategory(){

    const category: ICategory = {
      nameCategory: this.nameCategory.value,
      descriptionCategory: this.descriptionCategory.value,
    };

    this.categoryService.addCategory(category)
    .subscribe(response => {
      console.log(response);
    });
    this.categoryForm.reset();
  }

  ngOnInit(): void {
  }

}
