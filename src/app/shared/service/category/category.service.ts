import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/models/ICategory';
import { IPageResponse } from '../../../core/models/IPageResponse';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: ICategory[] = [];

  private apiStockUrl = 'http://localhost:8080/category/';

  constructor(private http: HttpClient) { }

  addCategory(categoryData: ICategory) :Observable<ICategory>{
    return this.http.post<ICategory>(this.apiStockUrl + "addCategory", categoryData);
  }

  getAllCategories(page: number, sort:string): Observable<IPageResponse<ICategory>>{

    let params = new HttpParams()
      .set('page', page)  
      .set('size', 5)
      .set('sortDirection', sort);
    return this.http.get<IPageResponse<ICategory>>(this.apiStockUrl + "getAllCategory", {params});
  }
}
