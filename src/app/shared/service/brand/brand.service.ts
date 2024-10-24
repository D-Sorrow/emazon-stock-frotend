import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from 'src/app/core/models/IBrand';
import { Observable } from 'rxjs';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { ICategory } from 'src/app/core/models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
  brands: IBrand[] = [];

  private apiStockUrl = 'http://localhost:8080/brand/';


  constructor(private http: HttpClient) { }

  addBrand(brandData: any):Observable<any>{
    return this.http.post<any>(this.apiStockUrl + "addBrand", brandData);
  }

  getAllBrands(page: number, sort: string): Observable<IPageResponse<IBrand>>{
    let params = new HttpParams()
      .set('page', page)
      .set('size', 5)
      .set('sortDirection', sort);

      return this.http.get<IPageResponse<IBrand>>(this.apiStockUrl + "getAllBrands", {params});
  }
}
