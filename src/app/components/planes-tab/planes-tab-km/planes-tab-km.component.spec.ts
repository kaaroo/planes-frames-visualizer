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

  it('should render filter by term', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.filter-form')).toBeTruthy();
  });

  it('should render speed in [kph]', () => {
    const compiled = fixture.debugElement.nativeElement;

    const arrayOfHeadersKph = Array.from(compiled.querySelectorAll('th')).find(
      (el: any) => el.innerHTML.includes('[mph]')
    );
    expect(arrayOfHeadersKph).toBeFalsy();

    const arrayOfHeadersMph = Array.from(compiled.querySelectorAll('th')).find(
      (el: any) => el.innerHTML.includes('[kph]')
    );
    expect(arrayOfHeadersMph).toBeTruthy();
  });
});
