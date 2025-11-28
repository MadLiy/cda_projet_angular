import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications-component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { removeNotification } from '../../stores/notifications/notification.actions';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let storeMock: any;

  beforeEach(async () => {
    storeMock = {
      select: vi.fn(),
      dispatch: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeNotification for each notification after 4 seconds', () => {
    const notifications = [{ id: 1, message: 'Test' }];
    storeMock.select.mockReturnValue(of(notifications));

    const setTimeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation((fn: TimerHandler, _delay?: number) => {
      if (typeof fn === 'function') fn();
      return 0 as unknown as number;
    });

    component.ngOnInit();

    expect(storeMock.dispatch).toHaveBeenCalledWith(removeNotification({ id: 1 }));

    setTimeoutSpy.mockRestore();
  });
});
