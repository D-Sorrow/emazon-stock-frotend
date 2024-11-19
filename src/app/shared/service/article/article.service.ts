import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { IArticle } from 'src/app/core/models/IArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  articles: IArticle[] = [];

  private apiStockUrl = 'http://localhost:8080/article/';


  constructor(private http: HttpClient) { }

  addArticle(articleData: IArticle):Observable<IArticle>{
    return this.http.post<IArticle>(this.apiStockUrl + "addArticle", articleData);
  }

  getAllArticles(page: number, sort: string, sortBy: string): Observable<IPageResponse<IArticle>>{
    let params = new HttpParams()
      .set('page', page)
      .set('size', 5)
      .set('sortDirection', sort)
      .set('sortBy', sortBy);

      return this.http.get<IPageResponse<IArticle>>(this.apiStockUrl + "getAllArticles", {params});
  }
}
