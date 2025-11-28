import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepComponent } from './step.component';
import { TravelService } from '../../services/travel.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;
  let travelServiceMock: any;
  let storeMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    travelServiceMock = {
      getSteps: () => of([]),
      addStep: (travelId: number, step: any) => of({ id: 1, name: step.name, order: 1, activities: [] }),
      updateStep: (travelId: number, stepId: number, step: any) => of({ id: stepId, name: step.name, order: 1, activities: [] }),
      deleteStep: (travelId: number, stepId: number) => of(undefined),
      getActivities: vi.fn(() => of([]))
    };

    storeMock = { dispatch: () => {} };

    matDialogMock = { open: () => ({ afterClosed: () => of(true) }) };

    await TestBed.configureTestingModule({
      imports: [StepComponent],
      providers: [
        provideRouter([]),
        { provide: TravelService, useValue: travelServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    component.travelId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Aucune étape prévue" when steps list is empty', () => {
    component.steps.set([]);
    component.loading.set(false);
    component.error.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noStep = compiled.querySelector('.no-step');
    expect(noStep?.textContent?.trim()).toBe('Aucune étape prévue');
  });

  it('should display steps when list is not empty', () => {
    component.steps.set([
      { id: 1, name: 'Step 1', order: 1, activities: [] },
      { id: 2, name: 'Step 2', order: 2, activities: [] }
    ]);
    component.loading.set(false);
    component.error.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const stepCards = compiled.querySelectorAll('.step-column');
    expect(stepCards.length).toBe(2);
  });

  it('should show loading spinner when loading() returns true', () => {
    component.loading.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-progress-spinner')).toBeTruthy();
  });

  it('should show error message when error() returns text', () => {
    component.error.set('Erreur test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')?.textContent).toContain('Erreur test');
  });
});
