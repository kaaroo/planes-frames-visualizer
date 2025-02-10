import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTabKmComponent } from './planes-tab-km.component';

describe('PlanesTabKmComponent', () => {
  let component: PlanesTabKmComponent;
  let fixture: ComponentFixture<PlanesTabKmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTabKmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesTabKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
