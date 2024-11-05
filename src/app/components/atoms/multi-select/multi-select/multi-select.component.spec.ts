import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICategory } from 'src/app/core/models/ICategory';
import { MultiSelectComponent } from './multi-select.component';


describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
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

  it('should toggle category selection and update selectedCategories array', () => {
    const category: ICategory = { idCategory: 1, nameCategory: 'Test Category', descriptionCategory: 'Test Description' };
    component.categories = [category];
    fixture.detectChanges();

    component.getValueToCategory(1);
    expect(component.selectedCategories).toContain(1);

    component.getValueToCategory(1);
    expect(component.selectedCategories).not.toContain(1);
  });
});
