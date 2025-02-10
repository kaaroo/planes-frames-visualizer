import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTabMilesComponent } from './planes-tab-miles.component';

describe('PlanesTabMilesComponent', () => {
  let component: PlanesTabMilesComponent;
  let fixture: ComponentFixture<PlanesTabMilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTabMilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesTabMilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
