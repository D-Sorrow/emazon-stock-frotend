import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { ICategory } from 'src/app/core/models/ICategory';
import { IPageResponse } from 'src/app/core/models/IPageResponse';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a category', () => {
    const dummyCategory: ICategory = {
      nameCategory: 'Electrónica',
      descriptionCategory: 'Dispositivos y accesorios',
    };

    service.addCategory(dummyCategory).subscribe((response) => {
      expect(response).toEqual(dummyCategory); // Verifica que la respuesta sea la esperada
    });

    const req = httpMock.expectOne('http://localhost:8080/category/addCategory');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCategory); // Simula la respuesta del servidor
  });

  it('should retrieve all categories with pagination and sorting', () => {
    const dummyResponse: IPageResponse<ICategory> = {
      size: 5,
      pages: 2,
      sortBy: 'name',
      collection: 
        [{ nameCategory: 'Electrónica', descriptionCategory: 'Dispositivos y accesorios',}, 
        { nameCategory: 'Libros', descriptionCategory: 'Libros',}],
      
        pageSize: 5
    };

    service.getAllCategories(1, 'asc').subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/category/getAllCategory?page=1&size=5&sortDirection=asc');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse); 
  });

});
