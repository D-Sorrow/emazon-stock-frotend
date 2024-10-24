import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { BrandFormComponent } from './brand-form.component';
import { ButtomComponent } from '../../atoms/buttom/buttom.component';
import { of } from 'rxjs';
import { IBrand } from 'src/app/core/models/IBrand';

describe('BrandFormComponent', () => {
  let component: BrandFormComponent;
  let fixture: ComponentFixture<BrandFormComponent>;
  let mockBrandService: Partial<BrandService>;

  beforeEach(async () => {

    mockBrandService = {
      addBrand: jest.fn().mockReturnValue(of({})) 
    };

    await TestBed.configureTestingModule({
      declarations: [ 
        BrandFormComponent,
        ButtomComponent
      ],
      imports: [ReactiveFormsModule], 
      providers: [
        FormBuilder,
        { provide: BrandService, useValue: mockBrandService } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with two controls', () => {
    expect(component.brandForm.contains('brandName')).toBeTruthy();
    expect(component.brandForm.contains('brandDescription')).toBeTruthy();
  });

  it('should mark the form as invalid if required fields are empty', () => {
    const form = component.brandForm;
    form.get('brandName')?.setValue('');
    form.get('brandDescription')?.setValue('');
    expect(form.valid).toBeFalsy();
  });

  it('should mark the form as valid if required fields are filled', () => {
    const form = component.brandForm;
    form.get('brandName')?.setValue('Test Brand');
    form.get('brandDescription')?.setValue('Test Description');
    expect(form.valid).toBeTruthy();
  });

  it('should call addCategory on submitCategory and reset the form', () => {
    const form = component.brandForm;
    form.get('brandName')?.setValue('Test Brand');
    form.get('brandDescription')?.setValue('Test Description');

    const brand: IBrand = {
      brandName: 'Test Brand',
      brandDescription: 'Test Description',
    };

    component.submitCategory();

    expect(mockBrandService.addBrand).toHaveBeenCalledWith(brand);
    expect(form.get('brandName')?.value).toBeNull();
    expect(form.get('brandDescription')?.value).toBeNull();
  });
});
