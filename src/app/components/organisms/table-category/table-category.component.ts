import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../shared/service/category.service';
import { ICategory } from 'src/app/core/models/ICategory';
import { IPageResponse } from '../../../core/models/IPageResponse';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {

  

  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: IPageResponse<ICategory>) => {
        this.categories = data.collection; 
      }
    );
  }

}
