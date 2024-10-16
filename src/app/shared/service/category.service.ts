import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../core/models/ICategory';
import { IPageResponse } from '../../core/models/IPageResponse';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: ICategory[] = [];

  private apiStockUrl = 'http://localhost:8080/category/';

  constructor(private http: HttpClient) { }

  addCategory(categoryData: any) :Observable<any>{
    return this.http.post<any>(this.apiStockUrl + "addCategory", categoryData);
  }

  getAllCategories(){

    let params = new HttpParams()
      .set('page', 0)
      .set('size', 5)
      .set('sortDirection', 'DeSC');
    return this.http.get<IPageResponse<ICategory>>(this.apiStockUrl + "getAllCategory", {params});
  }
}
