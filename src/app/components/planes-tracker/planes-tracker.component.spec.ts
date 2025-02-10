import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTrackerComponent } from './planes-tracker.component';

describe('PlanesTrackerComponent', () => {
  let component: PlanesTrackerComponent;
  let fixture: ComponentFixture<PlanesTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTrackerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dashboard', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#planes-tracker-dashboard')).toBeTruthy();
  });

  it('should render 2 groups', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelectorAll('div.planes-tracker-dashboard__group').length ==
        2
    ).toBeTrue();
  });

  it('should render 3 items (for 3 tables)', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled
        .querySelectorAll('div.planes-tracker-dashboard__group')[1]
        .querySelectorAll('.planes-tracker-item').length == 3
    ).toBeTrue();
  });
});
