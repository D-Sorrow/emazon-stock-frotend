import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../shared/service/category/category.service';
import { CategoryFormComponent } from './category-form.component';
import { ButtomComponent } from '../../atoms/buttom/buttom.component';
import { of } from 'rxjs';
import { ICategory } from 'src/app/core/models/ICategory';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {

    categoryServiceMock = {
      addCategory: jest.fn().mockReturnValue(of({})) 
    };

    await TestBed.configureTestingModule({
      declarations: [ 
        CategoryFormComponent,
        ButtomComponent,
      ],
      imports: [ReactiveFormsModule], 
      providers: [
        FormBuilder,
        { provide: CategoryService, useValue: categoryServiceMock } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with two controls', () => {
    expect(component.categoryForm.contains('nameCategory')).toBeTruthy();
    expect(component.categoryForm.contains('descriptionCategory')).toBeTruthy();
  });

  it('should mark the form as invalid if required fields are empty', () => {
    const form = component.categoryForm;
    form.get('nameCategory')?.setValue('');
    form.get('descriptionCategory')?.setValue('');
    expect(form.valid).toBeFalsy();
  });

  it('should mark the form as valid if required fields are filled', () => {
    const form = component.categoryForm;
    form.get('nameCategory')?.setValue('Test Category');
    form.get('descriptionCategory')?.setValue('Test Description');
    expect(form.valid).toBeTruthy();
  });

  it('should call addCategory on submitCategory and reset the form', () => {
    const form = component.categoryForm;
    form.get('nameCategory')?.setValue('Test Category');
    form.get('descriptionCategory')?.setValue('Test Description');

    const category: ICategory = {
      nameCategory: 'Test Category',
      descriptionCategory: 'Test Description',
    };

    component.submitCategory();

    expect(categoryServiceMock.addCategory).toHaveBeenCalledWith(category);
    expect(form.get('nameCategory')?.value).toBeNull();
    expect(form.get('descriptionCategory')?.value).toBeNull();
  });
});
