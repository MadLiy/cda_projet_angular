import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityFormDialogComponent } from './activity-form-dialog-component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ActivityFormDialogComponent', () => {
  let component: ActivityFormDialogComponent;
  let fixture: ComponentFixture<ActivityFormDialogComponent>;

  let dialogClosedWith: any = null;
  const dialogRefStub = {
    close: (data?: any) => {
      dialogClosedWith = data;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityFormDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { activity: null, travelId: 1, stepId: 1 } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogClosedWith = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form when no activity is provided', () => {
    expect(component.activityForm.value).toEqual({
      title: '',
      description: '',
      schedule: ''
    });
  });

  it('should close dialog with form value on submit', () => {
    component.activityForm.setValue({
      title: 'Randonnée',
      description: 'Dans les bois',
      schedule: '11:00AM'
    });

    component.submit();

    expect(dialogClosedWith).toEqual({
      title: 'Randonnée',
      description: 'Dans les bois',
      schedule: '11:00AM'
    });
  });

  it('should not close dialog if form is invalid', () => {
    component.activityForm.setValue({
      title: '',
      description: 'Test',
      schedule: '10:00'
    });

    component.submit();

    expect(dialogClosedWith).toBeNull();
  });
});
