import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { IArticle } from 'src/app/core/models/IArticle';
import { environment } from 'src/environments/environment';
import { article_const } from '../../const/article.const';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  articles: IArticle[] = [];

  constructor(private http: HttpClient) { }

  addArticle(articleData: IArticle):Observable<IArticle>{
    return this.http.post<IArticle>(environment.api_url_stock + article_const.add_article_url, articleData);
  }

  getAllArticles(page: number, sort: string, sortBy: string): Observable<IPageResponse<IArticle>>{
    let params = new HttpParams()
      .set('page', page)
      .set('size', 5)
      .set('sortDirection', sort)
      .set('sortBy', sortBy);

      return this.http.get<IPageResponse<IArticle>>(environment.api_url_stock + article_const.get_articles_url, {params});
  }
}
