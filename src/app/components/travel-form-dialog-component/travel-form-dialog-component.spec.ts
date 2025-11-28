import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelFormDialogComponent } from './travel-form-dialog-component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Travel } from '../../models/travel.model';

describe('TravelFormDialogComponent', () => {
  let component: TravelFormDialogComponent;
  let fixture: ComponentFixture<TravelFormDialogComponent>;

  let dialogClosedWith: any = null;
  const dialogRefStub = {
    close: (data?: any) => {
      dialogClosedWith = data;
    }
  };

  const mockTravel: Travel = {
    id: 1,
    title: 'Voyage Test',
    destination: 'Paris',
    description: 'Description test',
    startDate: '2025-11-28',
    endDate: '2025-12-28',
    imageUrl: '',
    steps: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelFormDialogComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { travel: mockTravel } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogClosedWith = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided travel data', () => {
    expect(component.travelForm.value).toEqual({
      title: mockTravel.title,
      destination: mockTravel.destination,
      description: mockTravel.description,
      startDate: mockTravel.startDate,
      endDate: mockTravel.endDate,
      imageUrl: mockTravel.imageUrl
    });
  });

  it('should close dialog with form value on submit', () => {
    component.travelForm.setValue({
      title: 'Voyage Modifié',
      destination: 'Lyon',
      description: 'Nouvelle description',
      startDate: '2025-12-01',
      endDate: '2025-12-10',
      imageUrl: 'url.png'
    });

    component.submit();

    expect(dialogClosedWith).toEqual({
      title: 'Voyage Modifié',
      destination: 'Lyon',
      description: 'Nouvelle description',
      startDate: '2025-12-01',
      endDate: '2025-12-10',
      imageUrl: 'url.png'
    });
  });

  it('should not close dialog if form is invalid', () => {
    component.travelForm.setValue({
      title: '',
      destination: 'Lyon',
      description: 'Test',
      startDate: null,
      endDate: null,
      imageUrl: ''
    });

    component.submit();

    expect(dialogClosedWith).toBeNull();
  });

  it('should close dialog without data on close()', () => {
    component.close();
    expect(dialogClosedWith).toBeUndefined();
  });
});
