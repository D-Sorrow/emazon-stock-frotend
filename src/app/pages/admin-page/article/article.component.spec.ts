import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { of, throwError } from 'rxjs';
import { IArticle } from 'src/app/core/models/IArticle';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormType } from '../../../shared/enum/form-type.enum';
import { AtomsModule} from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { OrganismsModule } from 'src/app/components/organisms/organisms.module';
import { IPageResponse } from 'src/app/core/models/IPageResponse';

import { ArticleComponent } from './article.component';
import { DataForm } from 'src/app/shared/utils/DataForm';
import { multiSelectType } from 'src/app/shared/enum/multiSelect-type.enum';

const articleServiceMock = {
  addArticle: jest.fn().mockReturnValue(of({}))
};

const mockCategoryService = {
  getAllCategories: jest.fn().mockReturnValue(of({
    collection: [
      { nameCategory: 'Category 1', descriptionCategory: 'Description 1' },
    ],
    pageSize: 2
  }))
}

const mockBrandService = {
  getAllBrands: jest.fn().mockReturnValue(of({
    collection: [
      { brandName: 'Brand 1', brandDescription: 'Brand 1' },
    ],
    pageSize: 2
  }))
}

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articleService: ArticleService;
  let categoryService: CategoryService;
  let brandService: BrandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, AtomsModule, MoleculesModule, OrganismsModule],
      providers: [
              { provide: ArticleService, useValue: articleServiceMock },
              { provide: CategoryService, useValue: mockCategoryService },
              { provide: BrandService, useValue: mockBrandService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService);
    categoryService = TestBed.inject(CategoryService);
    brandService = TestBed.inject(BrandService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the multi-select options', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.brands.length).toBeGreaterThan(0);
  });

  it('should have formType set to FormType.ARTICLE', () => {
    expect(component.formType).toBe(FormType.ARTICLE);
  });

  it('should load more categories and brands when chargeData is called', () => {
    component.chargeData(multiSelectType.CATEGORY);
    expect(categoryService.getAllCategories).toHaveBeenCalled();

    component.chargeData(multiSelectType.BRAND);
    expect(brandService.getAllBrands).toHaveBeenCalled();
  });

  it('should call saveData and add article', () => {
    const dataFormMock: IArticle = {
      nameArticle: 'Article Test',
      descriptionArticle: 'Description Test',
      stock: 10,
      price: 100,
      categories: [1, 2],
      brand: 1
    }

    component.saveData(dataFormMock);
    expect(articleService.addArticle).toHaveBeenCalled();
  });


});
