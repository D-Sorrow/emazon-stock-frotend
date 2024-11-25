import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/service/toast/toast.service';
import { ComponentSize } from 'src/app/shared/enum/component-size.enum';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {

  message: string | null = null;
  status: 'success' | 'error' | 'warning' | null = null;
  sizeButton = ComponentSize.SMALL;

  private toastSub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSub = this.toastService.toastMessage$.subscribe((toast) => {
      if (toast) {
        this.message = toast.message;
        this.status = toast.status;

        setTimeout(() => this.clearToast(), 3000);
      }
    });
  }

  clearToast() {
    this.message = null;
    this.status = null;
  }

  ngOnDestroy(): void {
    this.toastSub.unsubscribe(); 
  }
}
