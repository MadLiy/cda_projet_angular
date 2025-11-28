import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFormDialogComponent } from './step-form-dialog-component';

describe('StepFormDialogComponent', () => {
  let component: StepFormDialogComponent;
  let fixture: ComponentFixture<StepFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFormDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
