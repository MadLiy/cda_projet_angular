import { Component, inject, OnInit, signal } from "@angular/core";
import { StepComponent } from "../../components/step/step.component";
import { CommonModule } from "@angular/common";
import { Travel } from "../../models/travel.model";
import { TravelService } from "../../services/travel.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-travel-detail-page',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    StepComponent
  ],
  templateUrl: './travel-detail-page.component.html'
})
export class TravelDetailPageComponent implements OnInit {
 protected travel?: Travel;
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  private travelService = inject(TravelService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const travelId = Number(this.route.snapshot.paramMap.get('id'));
    if (!travelId) {
      this.error.set('Voyage introuvable');
      this.loading.set(false);
      return;
    }

    this.travelService.getTravelById(travelId).subscribe({
      next: (travel) => {
        if (!travel) {
          this.router.navigate(['/404']);
          return;
        }
        this.travel = travel;
        this.loading.set(false);
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }
}
