import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListArticlesComponent } from './list-articles.component';
import { ArticleService } from 'src/app/shared/service/article/article.service';
import { IPageResponse } from 'src/app/core/models/IPageResponse';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IArticle } from 'src/app/core/models/IArticle';
import { of } from 'rxjs';



describe('ListArticlesComponent', () => {
  let component: ListArticlesComponent;
  let fixture: ComponentFixture<ListArticlesComponent>;
  let articleService: ArticleService;
  let httpMock: HttpTestingController;


  const mockArticles: IArticle[] = [
    { idArticle: 1, nameArticle: 'Article 1', descriptionArticle: 'Description 1', brand: '1' , categories: [1,2] },
    { idArticle: 2, nameArticle: 'Article 2', descriptionArticle: 'Description 2', brand:'2' , categories: [3,4] },
  ];

  const mockResponse: IPageResponse<IArticle> = {
    collection: mockArticles,
    pageSize: 1,
    size: 5,  
    pages: 1, 
    sortBy: 'nameArticle'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ArticleService ],
      declarations: [ ListArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    articleService = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    jest.spyOn(articleService, 'getAllArticles').mockReturnValue(of(mockResponse));
  
    component.ngOnInit();
  
    expect(articleService.getAllArticles).toHaveBeenCalledWith(0, 'asc', 'nameArticle');
    expect(component.articles).toEqual(mockArticles);
    expect(component.pagesSize).toBe(1);
  });

  it('should call getAllArticles and update articles on nextPage()', () => {

    component.pagesSize = 2;
    component.currentPage = 0;

    jest.spyOn(articleService, 'getAllArticles').mockReturnValue(of(mockResponse));

    component.nextPage();

    expect(articleService.getAllArticles).toHaveBeenCalledWith(1, 'asc', 'nameArticle');
    expect(component.articles).toEqual(mockResponse.collection);
    expect(component.currentPage).toBe(1);
  });

  it('should call getAllArticles and update articles on previousPage()', () => {

    component.currentPage = 1;

    jest.spyOn(articleService, 'getAllArticles').mockReturnValue(of(mockResponse));

    component.previousPage();

    expect(component.currentPage).toBe(0);
  });

  it('should update habledFilter and call getFilteredArticles when a filter is toggled on', () => {
    jest.spyOn(component, 'getFilteredArticles');
    
    const event: [string, boolean] = ['Marca', true];
    component.handleToggleChange(event);

    expect(component.habledFilter).toEqual([
      ['Marca', true],
      ['Categoría', false],
      ['Nombre', false]
    ]);

    expect(component.getFilteredArticles).toHaveBeenCalledWith('Marca');
  });

  it('should update sortBy to "brand.brandName" when "Marca" filter is applied', () => {
    jest.spyOn(articleService, 'getAllArticles').mockReturnValue(of(mockResponse));

    component.getFilteredArticles('Marca');

    expect(component.sortBy).toBe('brand.brandName');

    expect(articleService.getAllArticles).toHaveBeenCalledWith(0, component.sortField, component.sortBy);
  });
});
