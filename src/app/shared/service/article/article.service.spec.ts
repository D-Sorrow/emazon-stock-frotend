import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { IArticle } from 'src/app/core/models/IArticle';

describe('ArticleService', () => {
    let service: ArticleService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [ArticleService],
        });
        service = TestBed.inject(ArticleService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to add an article', () => {
        const mockArticle: IArticle = {
            nameArticle: 'Test Article',
            descriptionArticle: 'Description of Test Article',
            stock: 10,
            price: 100,
            categories: [1, 2]
    };
        service.addArticle(mockArticle).subscribe((article) => {
            expect(article).toEqual(mockArticle);
        });

        const req = httpMock.expectOne('http://localhost:8080/article/addArticle');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockArticle);
        req.flush(mockArticle);
    });
});
