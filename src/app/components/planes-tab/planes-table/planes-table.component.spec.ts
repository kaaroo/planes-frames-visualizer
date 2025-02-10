import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTableComponent } from './planes-table.component';

describe('PlanesTableComponent', () => {
  let component: PlanesTableComponent;
  let fixture: ComponentFixture<PlanesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.planes-table')).toBeTruthy();
  });

  it('should by default not render filter by term', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.filter-form')).toBeFalsy();
  });

  it('should by default render speed in [kph]', () => {
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
