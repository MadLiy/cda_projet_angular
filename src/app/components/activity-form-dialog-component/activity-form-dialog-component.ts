import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../models/activity.model';
import { activityTitleValidator } from '../../validators/activity.validators';

@Component({
  selector: 'app-activity-form-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './activity-form-dialog-component.html',
  styleUrl: './activity-form-dialog-component.css',
})
export class ActivityFormDialogComponent {

activityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActivityFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { activity: Activity | null, travelId: number, stepId: number }) 
  {
    this.activityForm = this.fb.group({
      title: [
        data.activity?.title || '', 
        [Validators.required, activityTitleValidator()]
      ],
      description: [data.activity?.description || ''],
      schedule: [data.activity?.schedule || '']
    });
  }

  submit(): void {
    if (this.activityForm.valid) {
      this.dialogRef.close(this.activityForm.value);
    }
  }
}
