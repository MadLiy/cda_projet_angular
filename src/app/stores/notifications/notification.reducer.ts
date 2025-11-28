import { createReducer, on } from '@ngrx/store';
import { addNotification, removeNotification } from './notification.actions';

export interface Notification {
  id: number;
  message: string;
}

export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: []
};

let nextId = 0;

export const notificationReducer = createReducer(
  initialState,
  on(addNotification, (state, { message }) => ({
    notifications: [...state.notifications, { id: nextId++, message }]
  })),
  on(removeNotification, (state, { id }) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
);
