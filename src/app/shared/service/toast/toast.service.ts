import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Toast {
  message: string;
  status: 'success' | 'error' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toastMessage$ = this.toastSubject.asObservable();

  showToast(message: string, status: 'success' | 'error' | 'warning') {
    this.toastSubject.next({ message, status });
  }
}
