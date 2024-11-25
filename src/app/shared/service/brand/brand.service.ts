import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from 'src/app/core/models/IBrand';
import { Observable } from 'rxjs';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { environment } from 'src/environments/environment';
import { brand_const } from '../../const/brand.const';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
  brands: IBrand[] = [];

  constructor(private http: HttpClient) { }

  addBrand(brandData: IBrand):Observable<IBrand>{
    return this.http.post<IBrand>(environment.api_url_stock + brand_const.add_brand_url, brandData);
  }

  getAllBrands(page: number, sort: string): Observable<IPageResponse<IBrand>>{
    let params = new HttpParams()
      .set('page', page)
      .set('size', 5)
      .set('sortDirection', sort);

      return this.http.get<IPageResponse<IBrand>>(environment.api_url_stock + brand_const.get_categories_url, {params});
  }
}
