import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityComponent } from './activity.component';
import { TravelService } from '../../services/travel.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

class MockTravelService {
  getActivities(travelId: number, stepId: number) {
    return { subscribe: (callbacks: any) => callbacks.next([]) };
  }
  addActivity() { return { subscribe: () => {} }; }
  updateActivity() { return { subscribe: () => {} }; }
  updateActivityStatus() { return { subscribe: () => {} }; }
  deleteActivity() { return { subscribe: () => {} }; }
}

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ActivityComponent],
    providers: [
      { provide: TravelService, useClass: MockTravelService },
      { provide: Store, useValue: { dispatch: () => {} } },
      { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => ({ subscribe: (fn: any) => fn(null) }) }) } }
    ]
  }).compileComponents();

    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Aucune activité prévue" when list is empty', () => {
    component.activities.set([]);
    component.loading.set(false);
    component.error.set(null); 
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyText = compiled.querySelector('.no-activity');

    expect(emptyText?.textContent?.trim()).toBe('Aucune activité prévue');
  });

  it('should display activities when list is not empty', () => {
    component.activities.set([
      { id: 1, title: 'Réunion', description: 'Réunion équipe', status: 'prevue' },
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.activity-card');

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
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const error = compiled.querySelector('.error');

    expect(error?.textContent?.trim()).toBe('Erreur de chargement');
  });
});
