import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand} from 'src/app/core/models/IBrand';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { IPageResponse} from '../../../core/models/IPageResponse'

@Component({
  selector: 'app-table-brand',
  templateUrl: './table-brand.component.html',
  styleUrls: ['./table-brand.component.scss']
})
export class TableBrandComponent implements OnInit {

  currentPage: number = 0; 
  pageSize: number = 0;
  sortField: string = 'asc';

  brands: IBrand[] = [];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
      (data: IPageResponse<IBrand>) => {
        this.brands = data.collection; 
      }
    );
  }

  nextPage() {
    if(this.currentPage < this.pageSize){
      this.currentPage++;
      console.log('Página actual:', this.currentPage);
      this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
        response => {
          this.brands = response.collection;
          console.log('Categorías cargadas:', this.brands);
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
    this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
      response => {
        this.brands = response.collection;
        console.log('Categorías cargadas:', this.brands);
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

    this.brandService.getAllBrands(this.currentPage, this.sortField).subscribe(
      response => {
        this.brands = response.collection;
        console.log('Categorías cargadas:', this.brands);
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
    console.log('Campo de ordenamiento:', this.sortField);
    
  }

}
