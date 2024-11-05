import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../../../shared/service/article/article.service';
import { CategoryService } from '../../../../shared/service/category/category.service';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { IArticle } from'src/app/core/models/IArticle';
import { IBrand } from 'src/app/core/models/IBrand';
import { ICategory } from'src/app/core/models/ICategory';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {



  @Input() textButton: string = '';

  sortBy: string = 'asc';
  countPageCategory: number = 0;
  countPageBrand: number = 0;

  totalPagesCategories: number = 0;
  totalPagesBrands: number = 0;

  selectedCategories: number[] = [];
  selectedBrands: number[] = [];

  categories: ICategory[] = [];
  brands: IBrand[] = [];


  constructor(private fb: FormBuilder, private articleService: ArticleService,
    private categoryService: CategoryService, private brandService: BrandService){
  }

  articleForm = this.fb.group({
    articleName: ['', [Validators.required, Validators.maxLength(50)]],
    articleDescription: ['', [Validators.required, Validators.maxLength(90)]],
    articleQuantity: ['', [Validators.required, Validators.min(1)]],
    articlePrice: ['', [Validators.required, Validators.min(0)]],
  });

  get nameArticle() { return this.articleForm.get('articleName') as FormControl; }
  get descriptionArticle() { return this.articleForm.get('articleDescription') as FormControl; }
  get quantity() { return this.articleForm.get('articleQuantity') as FormControl; }
  get price() { return this.articleForm.get('articlePrice') as FormControl; }

  submitArticle(){
    const article: IArticle = {
      nameArticle: this.nameArticle.value,
      descriptionArticle: this.descriptionArticle.value,
      stock: this.quantity.value,
      price: this.price.value,
      categories: this.selectedCategories,
    };
    this.articleService.addArticle(article).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories(this.countPageCategory, this.sortBy).subscribe(categories => {
      this.categories = categories.collection;
      this.totalPagesCategories = categories.pageSize;
    });
    this.brandService.getAllBrands(this.countPageBrand, this.sortBy).subscribe(brands => {
      this.brands = brands.collection;
      this.totalPagesBrands = brands.pageSize;
    });
    this.countPageCategory++;
    this.countPageBrand++;
  }

  onScrollDownCategory() {

    if(this.countPageCategory < this.totalPagesCategories) {
      
      this.categoryService.getAllCategories(this.countPageCategory, this.sortBy).subscribe(categories => {
        this.categories = this.categories.concat(categories.collection);
        this.totalPagesCategories = categories.pageSize;
      });
      this.countPageCategory++;
    }

  }

  onScrollDownBrand() {
    if(this.countPageBrand < this.totalPagesBrands) {
      this.brandService.getAllBrands(this.countPageBrand, this.sortBy).subscribe(brands => {
        this.brands = this.brands.concat(brands.collection);
        this.totalPagesBrands = brands.pageSize;
      });
      this.countPageBrand++;
    }
  }

  onSelectedCategoriesChange(categories: number[]): void {
    this.selectedCategories = categories;
  }

  onSelectedBrandsChange(brands: number[]): void {
    this.selectedBrands = brands;
  }

  maxOfCategories(){
    return this.selectedCategories.length > 3
  }

  maxOfBrands(){
    return this.selectedBrands.length > 1
  }
}

