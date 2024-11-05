import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleFormComponent } from './article-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../../../shared/service/brand/brand.service';
import { ArticleService } from '../../../../shared/service/article/article.service';
import { CategoryService } from '../../../../shared/service/category/category.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MultiSelectBrandComponent } from '../../../../components/atoms/multi-select-brand/multi-select-brand/multi-select-brand.component';
import { MultiSelectComponent } from '../../../atoms/multi-select/multi-select/multi-select.component'; 
import { ButtomComponent } from '../../../atoms/buttom/buttom.component';


describe('ArticleFormComponent', () => {
    let component: ArticleFormComponent;
    let fixture: ComponentFixture<ArticleFormComponent>;
    let mockArticleService: Partial<ArticleService>;
    let mockCategoryService: Partial<CategoryService>;
    let mockBrandService: Partial<BrandService>;

    beforeEach(async () => {
        mockArticleService = {
            addArticle: jest.fn().mockReturnValue(of({}))
        };
        mockCategoryService = {
            getAllCategories: jest.fn().mockReturnValue(of({ collection: [{ id: 1, name: 'Category 1' }], pageSize: 2 }))
        };
        mockBrandService = {
            getAllBrands: jest.fn().mockReturnValue(of({ collection: [{ id: 1, name: 'Brand 1' }], pageSize: 2 }))
        };

        await TestBed.configureTestingModule({
            declarations: [ArticleFormComponent, MultiSelectBrandComponent, MultiSelectComponent, ButtomComponent ],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: HttpClient, useValue: {} },
                { provide: ArticleService, useValue: mockArticleService },
                { provide: CategoryService, useValue: mockCategoryService },
                { provide: BrandService, useValue: mockBrandService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call submitArticle and ArticleService.addArticle', () => {
        component.nameArticle.setValue('Test Article');
        component.descriptionArticle.setValue('Test Description');
        component.quantity.setValue(10);
        component.price.setValue(100);
    
        component.submitArticle();
    
        expect(mockArticleService.addArticle).toHaveBeenCalledWith({
            nameArticle: 'Test Article',
            descriptionArticle: 'Test Description',
            stock: 10,
            price: 100,
            categories: []
        });
    });

    it('should fetch categories and brands on init', () => {
        component.ngOnInit();
        expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
        expect(mockBrandService.getAllBrands).toHaveBeenCalled();
    });

    it('should call getAllCategories when onScrollDownCategory is called and append data', () => {
        component.countPageCategory = 0;
        component.totalPagesCategories = 2;
        component.categories = [];
    
        component.onScrollDownCategory();
        fixture.detectChanges(); 
    
        expect(mockCategoryService.getAllCategories).toHaveBeenCalledWith(0, 'asc');
        expect(component.categories).toEqual([{ id: 1, name: 'Category 1' }]); 
    });

    it('should call getAllBrands when onScrollDownBrand is called and append data', () => {
        component.countPageBrand = 0;
        component.totalPagesBrands = 2;
        component.brands = [];

        component.onScrollDownBrand();

        expect(mockBrandService.getAllBrands).toHaveBeenCalledWith(0, 'asc');
        expect(component.brands).toEqual([{ id: 1, name: 'Brand 1' }]);
        expect(component.countPageBrand).toBe(1);
    });

    it('should update selectedCategories when onSelectedCategoriesChange is called', () => {
        component.onSelectedCategoriesChange([1, 2, 3]);
        expect(component.selectedCategories).toEqual([1, 2, 3]);
    });

    it('should update selectedBrands when onSelectedBrandsChange is called', () => {
        component.onSelectedBrandsChange([4, 5]);
        expect(component.selectedBrands).toEqual([4, 5]);
    });

    it('should return true if selectedCategories length > 3 in maxOfCategories', () => {
        component.selectedCategories = [1, 2, 3, 4];
        expect(component.maxOfCategories()).toBe(true);
    });

    it('should return false if selectedCategories length <= 3 in maxOfCategories', () => {
        component.selectedCategories = [1, 2, 3];
        expect(component.maxOfCategories()).toBe(false);
    });

    it('should return true if selectedBrands length > 1 in maxOfBrands', () => {
        component.selectedBrands = [1, 2];
        expect(component.maxOfBrands()).toBe(true);
    });

    it('should return false if selectedBrands length <= 1 in maxOfBrands', () => {
        component.selectedBrands = [1];
        expect(component.maxOfBrands()).toBe(false);
    });
    
});
