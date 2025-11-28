import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function activityTitleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value || value.length < 3) {
      return { invalidTitle: 'Le titre doit contenir au moins 3 caractères' };
    }
    return null;
  };
}
