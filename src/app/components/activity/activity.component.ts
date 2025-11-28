import { Component, inject, Input, OnInit, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TravelService } from '../../services/travel.service';
import { Activity } from '../../models/activity.model';
import { ActivityFormDialogComponent } from '../activity-form-dialog-component/activity-form-dialog-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { addNotification } from '../../stores/notifications/notification.actions';

@Component({
  selector: 'app-activity-component',
  standalone: true,
  imports: [CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,

  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit {

  private readonly travelService = inject(TravelService);

  public activities = signal<Activity[]>([]);
  public loading = signal<boolean>(true);
  public error = signal<string | null>(null);

  constructor(private dialog: MatDialog, private store: Store) {}

  @Input() travelId!: number;
  @Input() stepId!: number;

  ngOnInit(): void {
      this.tryLoadActivities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['travelId'] || changes['stepId']) &&
        this.travelId != null &&
        this.stepId != null) {
      this.loadActivities();
    }
  }
  

  private tryLoadActivities() {
      if (this.travelId != null && this.stepId != null) {
          this.loadActivities();
      }
  }

  protected loadActivities(): void {
      this.loading.set(true);
      this.error.set(null);

      this.travelService.getActivities(this.travelId, this.stepId).subscribe({
          next: (activities) => {
              this.activities.set(activities);
              this.loading.set(false);
          },
          error: () => {
              this.error.set("Erreur lors du chargement des activités");
              this.loading.set(false);
          }
      });
  }

  protected openActivityDialog(activity?: Activity): void {
    const dialogRef = this.dialog.open(ActivityFormDialogComponent, {
      width: '400px',
      data: {
        activity: activity ? { ...activity } : null,
        travelId: this.travelId,
        stepId: this.stepId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (activity) {
          this.updateActivity(activity.id, result);
        } else {
          this.addActivity(result);
        }
      }
    });
  }

  protected toggleStatus(activity: Activity): void {
    const newStatus = activity.status === 'prevue' ? 'faite' : 'prevue';
    this.travelService.updateActivityStatus(this.travelId, this.stepId, activity.id, newStatus)
      .subscribe(updated => {
        this.activities.update(prev => prev.map(a => a.id === activity.id ? updated : a));
        this.store.dispatch(addNotification({ message: `Status de l'activité passé à ${newStatus}.` }));
      });
  }

  protected addActivity(activity: Partial<Activity>): void {
      this.travelService.addActivity(this.travelId, this.stepId, activity)
        .subscribe(newAct => { 
          this.activities.update(prev => [...prev, newAct]);
          this.store.dispatch(addNotification({ message: `Nouvelle activité "${newAct.title}" ajoutée !` }));
        });
  }

  protected updateActivity(activityId: number, data: Partial<Activity>): void {
      this.travelService.updateActivity(this.travelId, this.stepId, activityId, data)
        .subscribe(updated => {
          this.activities.update(prev => prev.map(a => a.id === activityId ? updated : a));
          this.store.dispatch(addNotification({ message: `Activité "${updated.title}" modifiée !` }));
        });
  }

  protected confirmDelete(activityId: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
      this.travelService.deleteActivity(this.travelId, this.stepId, activityId)
        .subscribe(() => {
          this.activities.update(prev => prev.filter(a => a.id !== activityId))
          this.store.dispatch(addNotification({ message: `Activité supprimée.` }));
        });
    }
  }
}
