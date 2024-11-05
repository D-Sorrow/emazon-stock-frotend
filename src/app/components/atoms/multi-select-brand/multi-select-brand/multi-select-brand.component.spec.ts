import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
