import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { IBrand } from 'src/app/core/models/IBrand';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { TableBrandComponent } from './table-brand.component';

const brandServiceMock = {
  getAllBrands: jest.fn(),
}

describe('TableBrandComponent', () => {
  let component: TableBrandComponent;
  let fixture: ComponentFixture<TableBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBrandComponent, PaginationComponent],
      imports: [FontAwesomeModule], 
      providers: [{ provide: BrandService, useValue: brandServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBrandComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockResponse: IPageResponse<IBrand> = {
      collection: [{ brandName: 'Brand 1', brandDescription: 'Brand 1' }],
      pageSize: 5,
      size: 0,
      pages: 0,
      sortBy: ''
    };

  brandServiceMock.getAllBrands.mockReturnValue(of(mockResponse));

  fixture.detectChanges();

  expect(component).toBeTruthy();
  expect(component.brands.length).toBe(1);
  expect(component.brands[0].brandName).toBe('Brand 1');
  });

  it('should increment currentPage and load brands when nextPage is called', () => {
    component.pageSize = 10;
    component.currentPage = 0;

    component.nextPage();

    expect(component.currentPage).toBe(1);
    expect(brandServiceMock.getAllBrands).toHaveBeenCalledWith(1, 'asc');
  });

  it('should decrement currentPage and load brands when previousPage is called', () => {
    component.currentPage = 2;
    component.pageSize = 10;
  
    component.previousPage();
  
    expect(component.currentPage).toBe(1);
    expect(brandServiceMock.getAllBrands).toHaveBeenCalledWith(1, 'asc');
  });

  it('should toggle sortField and load brands when sortTable is called', () => {
    component.sortField = 'asc';
  
    component.sortTable();
  
    expect(component.sortField).toBe('desc');
    expect(brandServiceMock.getAllBrands).toHaveBeenCalledWith(0, 'desc');
    
    component.sortTable();
    expect(component.sortField).toBe('asc');
    expect(brandServiceMock.getAllBrands).toHaveBeenCalledWith(0, 'asc');
  });

});
