import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelComponent } from './travel.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('TravelComponent', () => {
  let component: TravelComponent;
  let fixture: ComponentFixture<TravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TravelComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        RouterLink,
      ],
      providers: [
        provideRouter([]),
      {
        provide: Store,
        useValue: {
          dispatch: () => {},
          select: () => of([]),
        }
      },
      {
        provide: MatDialog,
        useValue: {
          open: () => ({ afterClosed: () => of(true) })
        }
      }
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Aucun voyage prévu" when list is empty', () => {
    component.travels.set([]);
    component.loading.set(false);
    component.error.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyText = compiled.querySelector('.no-travel');

    expect(emptyText?.textContent?.trim()).toBe('Aucun voyage prévu');
  });

  it('should display travels when list is not empty', () => {
    component.travels.set([
      { id: 1, 
        title: 
        'Voyage A', 
        destination: 'Paris', 
        description: '', 
        startDate: '2025-11-28', 
        endDate: '2026-11-28', 
        imageUrl: '', 
        steps: [] 
      },
    ]);
    component.loading.set(false);
    component.error.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.travel-card');

    expect(cards.length).toBe(1);
  });

  it('should show loading spinner when loading() returns true', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('mat-progress-spinner');

    expect(spinner).toBeTruthy();
  });

  it('should show error message when error() returns text', () => {
    component.error.set('Erreur de chargement');
    component.loading.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const error = compiled.querySelector('.error');

    expect(error?.textContent?.trim()).toBe('Erreur de chargement');
  });
});
