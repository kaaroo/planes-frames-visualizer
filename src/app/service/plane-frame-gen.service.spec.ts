import { TestBed } from '@angular/core/testing';

import { PlaneFrameGenerator } from './plane-frame-gen.service';

describe('PlaneFrameGenerator', () => {
  let service: PlaneFrameGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneFrameGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
