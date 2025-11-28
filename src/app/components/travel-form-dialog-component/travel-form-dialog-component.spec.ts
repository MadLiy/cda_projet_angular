import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFormDialogComponent } from './travel-form-dialog-component';

describe('TravelFormDialogComponent', () => {
  let component: TravelFormDialogComponent;
  let fixture: ComponentFixture<TravelFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelFormDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
