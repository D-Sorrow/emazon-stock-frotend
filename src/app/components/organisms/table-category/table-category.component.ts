import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../category.service';
import { ICategory } from 'src/app/core/models/ICategory';
import { ICategoryResponse } from '../../../core/models/IPageResponser';

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
      (data: ICategoryResponse) => {
        this.categories = data.collection; // Almacenar las categorías obtenidas
      }
    );
  }

}
