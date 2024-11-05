import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBrand } from 'src/app/core/models/IBrand';
import { MultiSelectBrandComponent } from './multi-select-brand.component';

describe('MultiSelectBrandComponent', () => {
  let component: MultiSelectBrandComponent;
  let fixture: ComponentFixture<MultiSelectBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit scrollDown when scroll reaches the bottom', () => {
    jest.spyOn(component.scrollDown, 'emit');

    const mockEvent = {
      target: {
        scrollHeight: 500,
        scrollTop: 400,
        clientHeight: 100
      }
    } as unknown as Event;

    component.scrollDownMethod(mockEvent);
    expect(component.scrollDown.emit).toHaveBeenCalled();
  });

  it('should toggle Brand selection and update selectedCategories array', () => {
    const brand: IBrand = { brandId: 1, brandName: 'Test Brand', brandDescription: 'Test Description' };
    component.brands = [brand];
    fixture.detectChanges();

    component.getValueToCategory(1);
    expect(component.selectedBrands).toContain(1);

    component.getValueToCategory(1);
    expect(component.selectedBrands).not.toContain(1);
  });
});
