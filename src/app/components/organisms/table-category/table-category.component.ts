import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CategoryService } from '../../../shared/service/category/category.service';
import { ICategory } from 'src/app/core/models/ICategory';
import { IPageResponse } from '../../../core/models/IPageResponse';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements OnInit {
[x: string]: any;

  currentPage: number = 0; 
  pageSize: number = 0;
  sortField: string = 'asc';


  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories(this.currentPage, this.sortField).subscribe(
      (data: IPageResponse<ICategory>) => {
        this.categories = data.collection; 
        this.pageSize = data.pageSize; 
      }
    );
  }

  
  nextPage() {
    if(this.currentPage < this.pageSize){
      this.currentPage++;
      console.log('Página actual:', this.currentPage);
      this.categoryService.getAllCategories(this.currentPage, this.sortField).subscribe(
        response => {
          this.categories = response.collection;
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
    this.categoryService.getAllCategories(this.currentPage, this.sortField).subscribe(
      response => {
        this.categories = response.collection;
        console.log('Categorías cargadas:', this.categories);
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
    console.log('Página actual:', this.currentPage);
  }

  sortTable() {
    if(this.sortField === 'asc'){
      this.sortField = 'desc';
    }else{
      this.sortField = 'asc';
    }
    
    this.categoryService.getAllCategories(this.currentPage, this.sortField).subscribe(
      response => {
        this.categories = response.collection;
        console.log('Categorías ordenadas:', this.categories);
      },
      error => {
        console.error('Error al ordenar las categorías:', error);
      }
    );
    console.log('Ordenado por:', this.sortField);
  }

}
