import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BrandService } from './brand.service';
import { IBrand } from 'src/app/core/models/IBrand';
import { IPageResponse } from 'src/app/core/models/IPageResponse';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a brand', () => {

    const dummyBrand: IBrand = {

      brandName: 'Asus',
      brandDescription: 'Asus',
    };

    service.addBrand(dummyBrand).subscribe((response) => {
      expect(response).toEqual(dummyBrand); // Verifica que la respuesta sea la esperada
    });

    const req = httpMock.expectOne('http://localhost:8080/brand/addBrand');
    expect(req.request.method).toBe('POST');
    req.flush(dummyBrand); // Simula la respuesta del servidor
  });

  it('should retrieve all categories with pagination and sorting', () => {
    const dummyResponse: IPageResponse<IBrand> = {
      size: 5,
      pages: 2,
      sortBy: 'name',
      collection: 
        [{ brandName: 'Asus', brandDescription: 'Asus',}, 
        { brandName: 'Apple', brandDescription: 'Apple',}],
      
        pageSize: 5
    };

    service.getAllBrands(1,'asc').subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/brand/getAllBrands?page=1&size=5&sortDirection=asc');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse); 
  });
});
