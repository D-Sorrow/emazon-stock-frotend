import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { of, throwError } from 'rxjs';
import { IBrand } from 'src/app/core/models/IBrand';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormType } from '../../../shared/enum/form-type.enum';
import { AtomsModule} from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { OrganismsModule } from 'src/app/components/organisms/organisms.module';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { BrandComponent } from './brand.component';
import { DataForm } from 'src/app/shared/utils/DataForm';

const mockBrandService = {
  getAllBrands: jest.fn().mockReturnValue(of({
    collection: [
      { brandName: 'Brand 1', brandDescription: 'Brand 1' },
    ],
    pageSize: 2
  }))
}

describe('BrandComponent', () => {

  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let brandService: BrandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandComponent ],
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule,
        AtomsModule,
        MoleculesModule,
        OrganismsModule
      ],
      providers: [{
        privede: BrandService, useValue: mockBrandService,
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initTable and load brands on ngOnInit', () => {
    const mockBrandsResponse = {
      collection: [
        { brandName: 'Brand 1', brandDescription: 'Description 1' },
        { brandName: 'Brand 2', brandDescription: 'Description 2' }
      ],
      pageSize: 2
    };

    jest.spyOn(brandService, 'getAllBrands').mockReturnValue(of(mockBrandsResponse as IPageResponse<IBrand>));

    component.ngOnInit();
    fixture.detectChanges();

    expect(brandService.getAllBrands).toHaveBeenCalledWith(0, 'asc');
    expect(component.brands.length).toBe(2);
    expect(component.pagesSize).toBe(2);
  });

  it('should map data form to brand correctly', () => {
    const dataForm = { name: 'Test Brand', description: 'Test Description' };
    const mappedBrand = component.mapDataFormToBrand(dataForm);

    expect(mappedBrand).toEqual({
      brandName: 'Test Brand',
      brandDescription: 'Test Description'
    });
  });

  it('should call saveData and use addBrand from brandService', () => {
    const mockBrand: IBrand = { brandName: 'Brand Test', brandDescription: 'Description Test' };
    jest.spyOn(brandService, 'addBrand').mockReturnValue(of(mockBrand));

    component.saveData(mockBrand);

    expect(brandService.addBrand).toHaveBeenCalledWith(mockBrand);
  });

  it('should navigate to the next page', () => {
    component.pagesSize = 3; 
    component.currentPage = 0;

    const mockBrandsResponse = {
      collection: [
        { brandName: 'Brand 1', brandDescription: 'Description 1' },
        { brandName: 'Brand 2', brandDescription: 'Description 2' }
      ],
      pageSize: 2
    };

    jest.spyOn(brandService, 'getAllBrands').mockReturnValue(of(mockBrandsResponse as IPageResponse<IBrand>));

    component.nextPage();

    expect(component.currentPage).toBe(1);
    expect(brandService.getAllBrands).toHaveBeenCalledWith(1, 'asc');
  });

  it('should call previousPage and decrement currentPage', () => {
    component.currentPage = 1;

    const mockBrandsResponse = {
      collection: [
        { brandName: 'Brand 1', brandDescription: 'Description 1' },
        { brandName: 'Brand 2', brandDescription: 'Description 2' }
      ],
      pageSize: 2
    };
    jest.spyOn(brandService, 'getAllBrands').mockReturnValue(of(mockBrandsResponse as IPageResponse<IBrand>));

    component.previousPage();
    expect(component.currentPage).toBe(0);
  });


  it('should toggle sortField between "asc" and "desc" and call brandService.getAllBrands', () => {
    const mockBrandsResponse = {
      collection: [
        { brandName: 'Brand 1', brandDescription: 'Description 1' },
        { brandName: 'Brand 2', brandDescription: 'Description 2' }
      ],
      pageSize: 2
    };
    jest.spyOn(brandService, 'getAllBrands').mockReturnValue(of(mockBrandsResponse as IPageResponse<IBrand>));

    component.sortItem();

    expect(component.sortField).toBe('desc');

    expect(brandService.getAllBrands).toHaveBeenCalledWith(component.currentPage, 'desc');

    component.sortItem();

    expect(component.sortField).toBe('asc');

    expect(brandService.getAllBrands).toHaveBeenCalledWith(component.currentPage, 'asc');
  });
});
