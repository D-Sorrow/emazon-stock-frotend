import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStockComponent } from './footer-stock.component';

describe('FooterStockComponent', () => {
  let component: FooterStockComponent;
  let fixture: ComponentFixture<FooterStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
