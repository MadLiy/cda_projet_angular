import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Travel } from '../../models/travel.model';
import { travelTitleValidator } from '../../validators/travel.validators';

@Component({
  selector: 'app-travel-form-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './travel-form-dialog-component.html',
  styleUrl: './travel-form-dialog-component.css',
})
export class TravelFormDialogComponent {

  travelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TravelFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { travel?: Travel }
  ) {
    this.travelForm = this.fb.group({
      title: [data.travel?.title || '', Validators.required, travelTitleValidator],
      destination: [data.travel?.destination || '', Validators.required],
      description: [data.travel?.description || ''],
      startDate: [data.travel?.startDate || null],
      endDate: [data.travel?.endDate || null],
      imageUrl: [data.travel?.imageUrl || '']
    });
  }

  submit() {
    if (this.travelForm.valid) {
      this.dialogRef.close(this.travelForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
