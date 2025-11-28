import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepFormDialogComponent } from './step-form-dialog-component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('StepFormDialogComponent', () => {
  let component: StepFormDialogComponent;
  let fixture: ComponentFixture<StepFormDialogComponent>;
  let dialogClosedWith: any = null;

  const dialogRefStub = {
    close: (data?: any) => { dialogClosedWith = data; }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepFormDialogComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { step: null } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StepFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogClosedWith = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with form value on submit', () => {
    component.stepForm.setValue({ name: 'Étape 1', order: 1 });
    component.submit();
    expect(dialogClosedWith).toEqual({ name: 'Étape 1', order: 1 });
  });

  it('should not close dialog if form invalid', () => {
    component.stepForm.setValue({ name: '', order: 1 });
    component.submit();
    expect(dialogClosedWith).toBeNull();
  });
});
