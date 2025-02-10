import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesTabAlterKmComponent } from './planes-tab-alter-km.component';

describe('PlanesTabAlterKmComponent', () => {
  let component: PlanesTabAlterKmComponent;
  let fixture: ComponentFixture<PlanesTabAlterKmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesTabAlterKmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesTabAlterKmComponent);
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
