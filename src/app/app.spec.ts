import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Store } from '@ngrx/store';

describe('App', () => {
  let storeMock: any;

  beforeEach(async () => {
    storeMock = { select: vi.fn(), dispatch: vi.fn() }; // stub minimal

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
