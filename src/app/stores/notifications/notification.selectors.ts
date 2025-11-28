import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NotificationState } from './notification.reducer';

export const selectNotificationState = createFeatureSelector<NotificationState>('notifications');

export const selectNotifications = createSelector(
  selectNotificationState,
  (state) => state.notifications
);
