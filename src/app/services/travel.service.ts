import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from '../models/travel.model';
import { Step } from '../models/step.model';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/travels';


  // =================================
  //              TRAVEL
  // =================================
  getAllTravels(): Observable<Travel[]> {
    return this.httpClient.get<Travel[]>(this.apiUrl);
  }

  getTravelById(id: number): Observable<Travel> {
    return this.httpClient.get<Travel>(`${this.apiUrl}/${id}`);
  }

  createTravel(travel: Partial<Travel>): Observable<Travel> {
    return this.httpClient.post<Travel>(this.apiUrl, travel);
  }

  updateTravel(id: number, travel: Partial<Travel>): Observable<Travel> {
    return this.httpClient.put<Travel>(`${this.apiUrl}/${id}`, travel);
  }

  deleteTravel(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // =================================
  //              STEP
  // =================================
  getSteps(travelId: number): Observable<Step[]> {
    return this.httpClient.get<Step[]>(`${this.apiUrl}/${travelId}/steps`);
  }

  getStepById(travelId: number, stepId: number): Observable<Step> {
    return this.httpClient.get<Step>(`${this.apiUrl}/${travelId}/steps/${stepId}`);
  }

  addStep(travelId: number, step: Partial<Step>): Observable<Step> {
    return this.httpClient.post<Step>(`${this.apiUrl}/${travelId}/steps`, step);
  }

  updateStep(travelId: number, stepId: number, step: Partial<Step>): Observable<Step> {
    return this.httpClient.put<Step>(`${this.apiUrl}/${travelId}/steps/${stepId}`, step);
  }

  deleteStep(travelId: number, stepId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${travelId}/steps/${stepId}`);
  }

  // =================================
  //              Activity
  // =================================
  getActivities(travelId: number, stepId: number): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities`
    );
  }

  getActivityById(travelId: number, stepId: number, activityId: number): Observable<Activity> {
    return this.httpClient.get<Activity>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities/${activityId}`
    );
  }

  addActivity(travelId: number, stepId: number, activity: Partial<Activity>): Observable<Activity> {
    return this.httpClient.post<Activity>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities`,
      activity
    );
  }

  updateActivity(
    travelId: number,
    stepId: number,
    activityId: number,
    activity: Partial<Activity>
  ): Observable<Activity> {
    return this.httpClient.put<Activity>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities/${activityId}`,
      activity
    );
  }

  updateActivityStatus(
    travelId: number,
    stepId: number,
    activityId: number,
    status: 'prevue' | 'faite'
  ): Observable<Activity> {
    return this.httpClient.patch<Activity>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities/${activityId}/status`,
      { status }
    );
  }

  deleteActivity(travelId: number, stepId: number, activityId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${travelId}/steps/${stepId}/activities/${activityId}`
    );
  }
}
