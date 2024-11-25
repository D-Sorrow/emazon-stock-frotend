import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/models/ICategory';
import { IPageResponse } from '../../../core/models/IPageResponse';
import { environment } from 'src/environments/environment';
import { category_const } from '../../const/category.const';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: ICategory[] = [];


  constructor(private http: HttpClient) { }

  addCategory(categoryData: ICategory) :Observable<ICategory>{
    return this.http.post<ICategory>(environment.api_url_stock + category_const.add_category_url, categoryData);
  }

  getAllCategories(page: number, sort:string): Observable<IPageResponse<ICategory>>{

    let params = new HttpParams()
      .set('page', page)  
      .set('size', 5)
      .set('sortDirection', sort);
    return this.http.get<IPageResponse<ICategory>>(environment.api_url_stock + category_const.get_categories_url, {params});
  }
}
