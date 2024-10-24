import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importamos FontAwesome para los iconos


describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit nextPagination when goToNextPage is called', () => {
    const spy = jest.spyOn(component.nextPagination, 'emit');
    component.goToNextPage();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit previousPagination when goToPreviousPage is called', () => {
    const spy = jest.spyOn(component.previousPagination, 'emit');
    component.goToPreviousPage();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit sortPagination when sort is called', () => {
    const spy = jest.spyOn(component.sortPagination, 'emit');
    component.sort();
    expect(spy).toHaveBeenCalled();
  });

});


