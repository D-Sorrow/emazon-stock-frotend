import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user/user.service';
import { ToastService } from 'src/app/shared/service/toast/toast.service';
import { of, throwError } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';


describe('AuxBodegaComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceMock: jest.Mocked<UserService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(async () => {

    userServiceMock = {
      addUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    toastServiceMock = {
      showToast: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ], 
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveData use addUser from userService', () => {
    const mockUser: IUser = {
      identityDocument: 1234567890,
      userName: 'testUser',
      userLastName: 'Test Lastname',
      userPhoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      userEmail: 'test@email.com',
      userPassword: 'password123',
      role: 'AUX_BODEGA',
    }
    jest.spyOn(userServiceMock, 'addUser').mockReturnValue(of(mockUser));

    component.saveUser(mockUser);

    expect(userServiceMock.addUser).toHaveBeenCalledWith(mockUser);
  });
});
