import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomComponent } from './buttom.component';

describe('ButtomComponent', () => {
  let component: ButtomComponent;
  let fixture: ComponentFixture<ButtomComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Matches with the component', () => {
    expect(compiled).toMatchSnapshot();
  });
});
