import { Component } from '@angular/core';
import { CategoryService } from './category.service';
import { ICategory } from './core/models/ICategory';
import { ICategoryResponse } from './core/models/IPageResponser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: ICategoryResponse) => {
        this.categories = data.collection; // Almacenar las categorías obtenidas
      }
    );
  }

  title = 'com.emazon.stock';
}
