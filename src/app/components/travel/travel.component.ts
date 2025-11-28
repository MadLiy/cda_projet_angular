import { Component, inject, OnInit, signal } from '@angular/core';
import { TravelService } from '../../services/travel.service';
import { Travel } from '../../models/travel.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirmDialog/confirmDialog.component';
import { TravelFormDialogComponent } from '../travel-form-dialog-component/travel-form-dialog-component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { addNotification } from '../../stores/notifications/notification.actions';

@Component({
  selector: 'app-travel-component',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css',
})
export class TravelComponent implements OnInit{

  private readonly travelService = inject(TravelService);
  public travels = signal<Travel[]>([]);
  public loading = signal<boolean>(true);
  public error = signal<string | null>(null);

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.loadTravels();
  }

  protected loadTravels(): void {
    this.loading.set(true);
    this.error.set(null);

    this.travelService.getAllTravels().subscribe({
      next: async (travels) => {
        this.travels.set(travels);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Erreur lors du chargement des travels');
        this.loading.set(false);
        console.error('Error loading travels:', error);
      }
    })
  }

  protected createTravel(travel: Partial<Travel>): void {
    this.travelService.createTravel(travel).subscribe({
      next: (created) => {
        this.travels.update(prev => [...prev, created]);
        this.store.dispatch(addNotification({ message: `Voyage crée.` }));

      },
      error: () => this.error.set("Erreur lors de la création du voyage")
    });
  }

  protected updateTravel(id: number, travel: Partial<Travel>): void {
    this.travelService.updateTravel(id, travel).subscribe({
      next: (updated) => {
        this.travels.update(prev =>
          prev.map(t => t.id === id ? updated : t)
        );
        this.store.dispatch(addNotification({ message: `Voyage modifié.` }));
      },
      error: () => this.error.set("Erreur lors de la mise à jour du voyage")
    });
  }

  protected deleteTravel(id: number): void {
    this.travelService.deleteTravel(id).subscribe({
      next: () => {
        this.travels.update(prev => prev.filter(t => t.id !== id));
        this.store.dispatch(addNotification({ message: `Voyage supprimée.` }));
      },
      error: () => this.error.set("Erreur lors de la suppression du voyage")
    });
  }


  confirmDelete(travelId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr(e) de vouloir supprimer ce voyage ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTravel(travelId);
      }
    });
  }

  openTravelForm(travel?: Travel) {
    const dialogRef = this.dialog.open(TravelFormDialogComponent, {
      data: { travel },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (travel) {
          this.updateTravel(travel.id, result);
        } else {
          this.createTravel(result);
        }
      }
    });
  }
}
