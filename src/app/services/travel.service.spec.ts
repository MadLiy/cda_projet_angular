import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TravelService } from './travel.service';
import { Travel } from '../models/travel.model';
import { Step } from '../models/step.model';
import { Activity } from '../models/activity.model';

describe('TravelService', () => {
  let service: TravelService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/travels';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TravelService]
    });

    service = TestBed.inject(TravelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ===========================
  // TRAVEL
  // ===========================
  it('should get all travels', () => {
    const dummyTravels: Travel[] = [
      { id: 1, title: 'Voyage A', destination: 'Paris', description: '', startDate: '28/11/2025', endDate: '28/11/2026', imageUrl: '', steps: [] },
      { id: 2, title: 'Voyage B', destination: 'Lyon', description: '', startDate: '28/11/2025', endDate: '28/11/2026', imageUrl: '', steps: [] }
    ];

    service.getAllTravels().subscribe(travels => {
      expect(travels.length).toBe(2);
      expect(travels).toEqual(dummyTravels);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTravels);
  });

  it('should create a travel', () => {
    const newTravel: Partial<Travel> = { title: 'Voyage C', destination: 'Nice' };
    const createdTravel: Travel = { 
      id: 3,
      title: newTravel.title ?? 'Titre par défaut',
      destination: newTravel.destination ?? 'Destination par défaut',
      description: '',
      startDate: '28/11/2025',
      endDate: '28/11/2026',
      imageUrl: '',
      steps: []
    };

    service.createTravel(newTravel).subscribe(travel => {
      expect(travel).toEqual(createdTravel);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(createdTravel);
  });

  it('should update a travel', () => {
    const travelId = 1;
    const updateData: Partial<Travel> = { title: 'Voyage A Modifié' };
    const updatedTravel: Travel = { 
      id: travelId, 
      title: 'Voyage A Modifié', 
      destination: 'Paris', 
      description: '', 
      startDate: '28/11/2025', 
      endDate: '28/11/2026', 
      imageUrl: '',
      steps: []
    };

    service.updateTravel(travelId, updateData).subscribe(travel => {
      expect(travel).toEqual(updatedTravel);
    });

    const req = httpMock.expectOne(`${apiUrl}/${travelId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTravel);
  });

  it('should delete a travel', () => {
    const travelId = 1;

    service.deleteTravel(travelId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${travelId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // ===========================
  // STEP
  // ===========================
  it('should get steps for a travel', () => {
    const travelId = 1;
    const dummySteps: Step[] = [
      { id: 1, name: 'Step 1', order:1, activities: [] },
      { id: 2, name: 'Step 2', order:2, activities: [] }
    ];

    service.getSteps(travelId).subscribe(steps => {
      expect(steps).toEqual(dummySteps);
    });

    const req = httpMock.expectOne(`${apiUrl}/${travelId}/steps`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySteps);
  });

  // ===========================
  // ACTIVITY
  // ===========================
  it('should get activities for a step', () => {
    const travelId = 1;
    const stepId = 1;
    const dummyActivities: Activity[] = [
      { id: 1, title: 'Activité 1', description: '', status: 'prevue' },
      { id: 2, title: 'Activité 2', description: '', status: 'faite' }
    ];

    service.getActivities(travelId, stepId).subscribe(activities => {
      expect(activities).toEqual(dummyActivities);
    });

    const req = httpMock.expectOne(`${apiUrl}/${travelId}/steps/${stepId}/activities`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyActivities);
  });
});
