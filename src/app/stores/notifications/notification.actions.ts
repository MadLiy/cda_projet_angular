import { createAction, props } from '@ngrx/store';

export const addNotification = createAction(
  '[Notification] Add',
  props<{ message: string }>()
);

export const removeNotification = createAction(
  '[Notification] Remove',
  props<{ id: number }>()
);
