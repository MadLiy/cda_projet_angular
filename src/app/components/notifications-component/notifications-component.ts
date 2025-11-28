import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNotifications } from '../../stores/notifications/notification.selectors';
import { removeNotification } from '../../stores/notifications/notification.actions';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification.model';
import { NotificationState } from '../../stores/notifications/notification.reducer';

@Component({
  selector: 'app-notifications-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      @for(n of notifications$ | async; track notifications$;; ){
        <div class="notification">
          {{ n.message }}
        </div>

      }
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 1000;
    }
    .notification {
      background-color: #164479;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      font-size: 0.9rem;
      animation: fadeIn 0.3s, fadeOut 0.3s 3.7s;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
  `]
})
export class NotificationsComponent {
  notifications$!: Observable<Notification[]>;

  constructor(private store: Store<{ notifications: NotificationState }>) {}

  ngOnInit() {
    this.notifications$ = this.store.select(selectNotifications);

    this.notifications$.subscribe(notifs => {
      notifs.forEach(n => {
        setTimeout(() => {
          this.store.dispatch(removeNotification({ id: n.id }));
        }, 4000);
      });
    });
  }
}
