import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TableCategoryComponent } from './table-category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { CategoryService } from '../../../shared/service/category/category.service';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { ICategory } from 'src/app/core/models/ICategory';

// Mock del servicio
const mockCategoryService = {
  getAllCategories: jest.fn()  // Simulamos el método getAllCategories como un mock
};

describe('TableCategoryComponent', () => {
  let component: TableCategoryComponent;
  let fixture: ComponentFixture<TableCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCategoryComponent, PaginationComponent],
      imports: [FontAwesomeModule], 
      providers: [
        { provide: CategoryService, useValue: mockCategoryService } // Usamos el mock del servicio
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCategoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Simulamos la respuesta del método getAllCategories para devolver un observable con datos
    const mockResponse: IPageResponse<ICategory> = {
      collection: [{ nameCategory: 'Category 1', descriptionCategory: 'Description 1' }],
      pageSize: 5,
      size: 0,
      pages: 0,
      sortBy: ''
    };

    // El mock del servicio debe devolver un observable
    mockCategoryService.getAllCategories.mockReturnValue(of(mockResponse));

    fixture.detectChanges(); // Dispara el ciclo de vida del componente (incluyendo ngOnInit)

    expect(component).toBeTruthy();
    expect(component.categories.length).toBe(1);
    expect(component.categories[0].nameCategory).toBe('Category 1');
  });

  it('should increment currentPage and load categories when nextPage is called', () => {
    component.pageSize = 10;
    component.currentPage = 0;

    component.nextPage();

    expect(component.currentPage).toBe(1);
    expect(mockCategoryService.getAllCategories).toHaveBeenCalledWith(1, 'asc');
  });

  it('should decrement currentPage and load categories when previousPage is called', () => {
    component.currentPage = 2;
    component.pageSize = 10;
  
    component.previousPage();
  
    expect(component.currentPage).toBe(1);
    expect(mockCategoryService.getAllCategories).toHaveBeenCalledWith(1, 'asc');
  });

  it('should toggle sortField and load categories when sortTable is called', () => {
    component.sortField = 'asc';
  
    component.sortTable();
  
    expect(component.sortField).toBe('desc');
    expect(mockCategoryService.getAllCategories).toHaveBeenCalledWith(0, 'desc');
    
    component.sortTable();
    expect(component.sortField).toBe('asc');
    expect(mockCategoryService.getAllCategories).toHaveBeenCalledWith(0, 'asc');
  });
});
