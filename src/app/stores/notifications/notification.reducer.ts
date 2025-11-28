import { createReducer, on } from "@ngrx/store";
import { addNotification, removeNotification } from "./notification.actions";

export interface Notification {
  id: number;
  message: string;
}

export interface NotificationState {
  notifications: Notification[];
  nextId: number;
}

export const initialState: NotificationState = {
  notifications: [],
  nextId: 0
};

export const notificationReducer = createReducer(
  initialState,
  on(addNotification, (state, { message }): NotificationState => ({
    notifications: [...state.notifications, { id: state.nextId, message }],
    nextId: state.nextId + 1
  })),
  on(removeNotification, (state, { id }): NotificationState => ({
    ...state,
    notifications: state.notifications.filter(n => n.id !== id)
  }))
);
