import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTabAlterKmComponent } from './planes-tab-alter-km.component';

describe('PlanesTabAlterKmComponent', () => {
  let component: PlanesTabAlterKmComponent;
  let fixture: ComponentFixture<PlanesTabAlterKmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTabAlterKmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanesTabAlterKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
