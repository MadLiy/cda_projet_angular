import { notificationReducer, initialState, NotificationState } from './notification.reducer';
import { addNotification, removeNotification } from './notification.actions';
import { selectNotifications } from './notification.selectors';

describe('Notification Store', () => {

    it('should have initial state', () => {
        expect(initialState).toEqual({ 
            notifications: [],
            nextId: 0
        });
    });

  it('should add a notification', () => {
    const state: NotificationState = notificationReducer(initialState, addNotification({ message: 'Hello' }));
    expect(state.notifications.length).toBe(1);
    expect(state.notifications[0].message).toBe('Hello');
    expect(state.notifications[0].id).toBeDefined();
  });

  it('should increment id for multiple notifications', () => {
    let state = notificationReducer(initialState, addNotification({ message: 'First' }));
    state = notificationReducer(state, addNotification({ message: 'Second' }));
    expect(state.notifications[0].id).toBe(0);
    expect(state.notifications[1].id).toBe(1);
  });

  it('should remove a notification by id', () => {
    let state = notificationReducer(initialState, addNotification({ message: 'To remove' }));
    const idToRemove = state.notifications[0].id;

    state = notificationReducer(state, removeNotification({ id: idToRemove }));
    expect(state.notifications.length).toBe(0);
  });

  it('selector should return notifications', () => {
    const state: { notifications: NotificationState } = {
      notifications: {
        notifications: [
          { id: 0, message: 'Hello' },
          { id: 1, message: 'World' }
        ],
        nextId: 2
      }
    };

    const selected = selectNotifications(state);
    expect(selected.length).toBe(2);
    expect(selected[0].message).toBe('Hello');
    expect(selected[1].message).toBe('World');
  });

});
