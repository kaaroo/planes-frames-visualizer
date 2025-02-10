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

  it('should not render filter by term', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.filter-form')).toBeFalsy();
  });

  it('should render speed in mph', () => {
    const compiled = fixture.debugElement.nativeElement;

    const arrayOfHeadersKph = Array.from(compiled.querySelectorAll('th')).find(
      (el: any) => el.innerHTML.includes('[kph]')
    );
    expect(arrayOfHeadersKph).toBeFalsy();

    const arrayOfHeadersMph = Array.from(compiled.querySelectorAll('th')).find(
      (el: any) => el.innerHTML.includes('[mph]')
    );
    expect(arrayOfHeadersMph).toBeTruthy();
  });
});
