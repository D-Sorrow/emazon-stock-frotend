import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../../../shared/service/article/article.service';
import { IArticle } from'src/app/core/models/IArticle';
import { ICategory } from'src/app/core/models/ICategory';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  @Input() textButton: string = '';

  categories: ICategory[] = [];
  
  constructor(private fb: FormBuilder, private articleService: ArticleService){
  }

  articleForm = this.fb.group({
    articleName: ['', [Validators.required, Validators.maxLength(50)]],
    articleDescription: ['', [Validators.required, Validators.maxLength(90)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(0)]],
  });

  get nameArticle() { return this.articleForm.get('articleName') as FormControl; }
  get descriptionArticle() { return this.articleForm.get('articleDescription') as FormControl; }
  get quantity() { return this.articleForm.get('quantity') as FormControl; }
  get price() { return this.articleForm.get('price') as FormControl; }

  submitArticle(){
    
  }

  ngOnInit(): void {
  }


}

