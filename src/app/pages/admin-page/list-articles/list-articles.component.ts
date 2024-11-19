import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/core/models/IArticle';
import { ArticleService} from 'src/app/shared/service/article/article.service';


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

  articles: IArticle[] = [];

  filters: string[] = ['Marca', 'Categoría', 'Nombre'];

  habledFilter: [string, boolean][] = [['Marca', false], ['Categoría', false], ['Nombre', false]];

  sortBy = 'nameArticle';

  sortField: string = 'asc';


  pagesSize = 0;
  currentPage = 0;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles(0, 'asc', this.sortBy).subscribe((response) => {
      this.articles = response.collection;
      this.pagesSize = response.pageSize;
    });
  }

  nextPage() {
    if(this.currentPage < this.pagesSize){
      this.currentPage++;
      this.articleService.getAllArticles(this.currentPage, this.sortField, this.sortBy).subscribe(
        response => {
          this.articles = response.collection;
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
    this.articleService.getAllArticles(this.currentPage, this.sortField, this.sortBy).subscribe(
      response => {
        this.articles = response.collection;
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  handleToggleChange(event: [string, boolean]) {
    const [label, isChecked] = event;

    let newTuple: [string, boolean] = [label,isChecked];

    const index = this.habledFilter.findIndex(tuple => tuple[0] === newTuple[0]);

    if(index !== -1) {
      this.habledFilter[index][1] = newTuple[1]
      if(this.habledFilter[index][1] == true){
        this.habledFilter.forEach((tuple, indexTo) => {
          if(indexTo != index){
            this.habledFilter[indexTo][1] = false; 
            this.getFilteredArticles(label);
          }
        });
      }
    }
  }

  getFilteredArticles(filter: string) {
    if(filter == 'Marca'){
      this.sortBy = 'brand.brandName';
    }else if(filter == 'Categoría'){
      this.sortBy = 'categories.nameCategory';
    }else{
      this.sortBy = 'nameArticle';
    }

    this.articleService.getAllArticles(0, this.sortField, this.sortBy).subscribe((response) => {
      this.articles = response.collection;
      this.pagesSize = response.pageSize;
    });
  }

  sortItem(){

    if(this.sortField === 'asc'){
      this.sortField = 'desc';
    }else{
      this.sortField = 'asc';
    }
    
    this.articleService.getAllArticles(this.currentPage, this.sortField, this.sortBy).subscribe(
      response => {
        this.articles = response.collection;
      }
    )

  }

}
