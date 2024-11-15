import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { of, throwError } from 'rxjs';
import { ICategory } from 'src/app/core/models/ICategory';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormType } from '../../../shared/enum/form-type.enum';
import { AtomsModule} from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { OrganismsModule } from 'src/app/components/organisms/organisms.module';
import { IPageResponse } from 'src/app/core/models/IPageResponse';

const mockCategoryService = {
  getAllCategories: jest.fn().mockReturnValue(of({
    collection: [
      { nameCategory: 'Category 1', descriptionCategory: 'Description 1' },
    ],
    pageSize: 2
  }))
}

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule,
        AtomsModule,
        MoleculesModule,
        OrganismsModule
      ],
      providers: [{
        privede: CategoryService, useValue: mockCategoryService,
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should have formType set to CATEGORY', () => {
    expect(component.formType).toBe(FormType.CATEGORY);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories and pagesSize on initTable', () => {
    const mockResponse = {
      collection: [
        { nameCategory: 'Category 1', descriptionCategory: 'Description 1' },
        { nameCategory: 'Category 2', descriptionCategory: 'Description 2' },
      ],
      pageSize: 2,
    };
    jest.spyOn(categoryService, 'getAllCategories').mockReturnValue(of(mockResponse as IPageResponse<ICategory>));


    component.initTable();
    expect(component.categories.length).toBe(2);
    expect(component.pagesSize).toBe(2);
  });

  it('should map data form to category correctly', () => {
    const dataForm = { name: 'Test Category', description: 'Test Description' };
    const mappedCategory = component.mapDataFormToCategory(dataForm);
    expect(mappedCategory.nameCategory).toBe('Test Category');
    expect(mappedCategory.descriptionCategory).toBe('Test Description');
  });

  it('should call nextPage and increment currentPage', () => {
    component.pagesSize = 2;
    component.currentPage = 0;

    const mockResponse = {
      collection: [{ nameCategory: 'Category 1', descriptionCategory: 'Description 1' }],
    };
    jest.spyOn(categoryService, 'getAllCategories').mockReturnValue(of(mockResponse as IPageResponse<ICategory> ));

    component.nextPage();
    expect(component.currentPage).toBe(1);
  });

  it('should call previousPage and decrement currentPage', () => {
    component.currentPage = 1;

    const mockResponse = {
      collection: [{ nameCategory: 'Category 1', descriptionCategory: 'Description 1' }],
    };
    jest.spyOn(categoryService, 'getAllCategories').mockReturnValue(of(mockResponse as IPageResponse<ICategory>));

    component.previousPage();
    expect(component.currentPage).toBe(0);
  });
});
