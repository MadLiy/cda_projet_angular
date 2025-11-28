import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirmDialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  let dialogClosedWith: any = null;
  const dialogRefStub = {
    close: (data?: any) => {
      dialogClosedWith = data;
    }
  };

  const mockData = {
    title: 'Confirmation',
    message: 'Êtes-vous sûr(e) ?'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogClosedWith = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct data injected', () => {
    expect(component.data).toEqual(mockData);
  });

  it('should close dialog with true', () => {
    component.close(true);
    expect(dialogClosedWith).toBe(true);
  });

  it('should close dialog with false', () => {
    component.close(false);
    expect(dialogClosedWith).toBe(false);
  });

  it('should close dialog without argument if no parameter is given', () => {
    component.close(undefined as any);
    expect(dialogClosedWith).toBeUndefined();
  });
});
