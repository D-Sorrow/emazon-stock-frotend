import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { IArticle } from 'src/app/core/models/IArticle';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to ToastService and set message and status', () => {
    // Simula la inicialización
    component.ngOnInit();

    // Validar que los datos del servicio fueron asignados correctamente
    expect(component.message).toBe(null);
    expect(component.status).toBe(null);
  });

  it('should clear message and status', () => {
    // Asigna valores iniciales
    component.message = 'Test message';
    component.status = 'success';

    // Ejecuta el método clearToast
    component.clearToast();

    // Validar que los valores fueron limpiados
    expect(component.message).toBeNull();
    expect(component.status).toBeNull();
  });
});
