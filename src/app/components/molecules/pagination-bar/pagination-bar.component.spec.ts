import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationBarComponent } from './pagination-bar.component';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';

describe('PaginationBarComponent', () => {
  let component: PaginationBarComponent;
  let fixture: ComponentFixture<PaginationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.nextButton).toBe(faChevronCircleRight);
    expect(component.prevButton).toBe(faChevronCircleLeft);
    expect(component.sizeButton).toBe(ComponentSize.XS);
    expect(component.pageCount).toBe(1);
    expect(component.pageSize).toBe(1);
  });

  it('should emit nextPage when nextPageClick is called and pageCount is less than pageSize', () => {
    component.pageSize = 3;
    component.pageCount = 1;

    jest.spyOn(component.nextPage, 'emit');

    component.nextPageClick();

    expect(component.pageCount).toBe(2); 
    expect(component.nextPage.emit).toHaveBeenCalled();  
  });
  
  it('should not emit prevPage when prevPageClick is called and pageCount is 1', () => {
    component.pageCount = 1;
    jest.spyOn(component.prevPage, 'emit'); 

    component.prevPageClick();

    expect(component.pageCount).toBe(1); 
    expect(component.prevPage.emit).not.toHaveBeenCalled(); 
  });
});
