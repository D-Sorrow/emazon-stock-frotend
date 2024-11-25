import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a toast message when showToast is called', (done) => {
    const mockToast = {
      message: 'Test message',
      status: 'success' as const,
    };
    service.showToast(mockToast.message, mockToast.status);
    service.toastMessage$.subscribe((toast) => {
      expect(toast).toEqual(mockToast);
      done();
    });
  });
});
