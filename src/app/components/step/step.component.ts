import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Step } from '../../models/step.model';
import { ActivityComponent } from '../activity/activity.component';
import { StepFormDialogComponent } from '../step-form-dialog-component/step-form-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirmDialog/confirmDialog.component';
import { Store } from '@ngrx/store';
import { addNotification } from '../../stores/notifications/notification.actions';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-step-component',
  imports: [ActivityComponent, RouterLink, MatProgressSpinner],
  templateUrl: './step.component.html',
  styleUrl: './step.component.css',
})
export class StepComponent implements OnInit {

    @Input() travelId!: number;
    private readonly travelService = inject(TravelService);
    public steps = signal<Step[]>([]);
    public loading = signal<boolean>(true);
    public error = signal<string | null>(null);

    constructor(private dialog: MatDialog, private store: Store) {}

    ngOnInit(): void {
        if (!this.travelId) {
        console.error("StepComponent: travelId manquant !");
        return;
        }
        this.loadSteps();
    }

    protected loadSteps(): void {
        this.loading.set(true);
        this.error.set(null);

        this.travelService.getSteps(this.travelId).subscribe({
            next: (steps) => {
                this.steps.set(steps);
                this.loading.set(false);
            },
            error: () => {
                this.error.set("Erreur lors du chargement des étapes");
                this.loading.set(false);
            }
        })
    }

  protected addStep(step: Partial<Step>): void {
    this.travelService.addStep(this.travelId, step).subscribe({
      next: (newStep) => {
        this.steps.update(prev => [...prev, newStep]);
        this.store.dispatch(addNotification({ message: `Nouvelle étape "${newStep.name}" ajoutée !` }));
      },
      error: () => this.error.set("Erreur lors de l'ajout de l'étape")
    });
  }

  protected updateStep(stepId: number, step: Partial<Step>): void {
    this.travelService.updateStep(this.travelId, stepId, step).subscribe({
      next: (updated) => {
        this.steps.update(prev =>
          prev.map(s => s.id === stepId ? updated : s)
        );
        this.store.dispatch(addNotification({ message: `Étape "${updated.name}" modifiée !` }));
      },
      error: () => this.error.set("Erreur lors de la mise à jour de l'étape")
    });
  }

  protected deleteStep(stepId: number): void {
    this.travelService.deleteStep(this.travelId, stepId).subscribe({
      next: () => {
        this.steps.update(prev => prev.filter(s => s.id !== stepId));
        this.store.dispatch(addNotification({ message: `Étape supprimée.` }));
      },
      error: () => this.error.set("Erreur lors de la suppression de l'étape")
    });
  }

  openStepForm(step?: Step) {
    const dialogRef = this.dialog.open(StepFormDialogComponent, {
      data: { step },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (step) {
          this.updateStep(step.id, result);
        } else {
          this.addStep(result);
        }
      }
    });
  }

  confirmDelete(stepId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr(e) de vouloir supprimer cette étape ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStep(stepId);
      }
    });
  }
}
