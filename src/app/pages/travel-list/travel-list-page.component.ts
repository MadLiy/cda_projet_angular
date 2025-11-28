import { Component } from "@angular/core";
import { TravelComponent } from "../../components/travel/travel.component";

@Component({
  selector: 'app-travel-list-page',
  standalone: true,
  imports: [TravelComponent],
  template: `<app-travel-component></app-travel-component>`
})
export class TravelListPageComponent {}