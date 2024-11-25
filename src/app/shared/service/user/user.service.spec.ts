import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IUser } from'src/app/core/models/IUser';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { user_const } from '../../const/user.const';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a category', () => {
    const dummyUser: IUser = {
      identityDocument: 123456789,
      userName: 'testUser',
      userLastName: 'Test User',
      userPhoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      userEmail: 'testuser@example.com',
      userPassword: 'password123',
      role: 'AUX_BODEGA',
    };

    service.addUser(dummyUser).subscribe((response) => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(environment.api_url_user + user_const.add_user_url);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser); 
  });
});
