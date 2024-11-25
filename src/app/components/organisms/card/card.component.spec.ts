import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { IArticle } from 'src/app/core/models/IArticle';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockArticles: IArticle[] = [
    { idArticle: 1, nameArticle: 'Article 1', price: 10, descriptionArticle: 'Description 1', brand: 1 , categories: [1,2] },
    { idArticle: 2, nameArticle: 'Article 2', price: 10, descriptionArticle: 'Description 2', brand: 2 , categories: [3,4] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.articles = mockArticles;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
