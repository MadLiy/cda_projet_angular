import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Step } from '../../models/step.model';

@Component({
  selector: 'app-step-form-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './step-form-dialog-component.html',
  styleUrl: './step-form-dialog-component.css',
})
export class StepFormDialogComponent {

  stepForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StepFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { step?: Step }
  ) {
    this.stepForm = this.fb.group({
      name: [data.step?.name || '', Validators.required],
      order: [data.step?.order || 1, Validators.required]
    });
  }

  submit() {
    if (this.stepForm.valid) {
      this.dialogRef.close(this.stepForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
