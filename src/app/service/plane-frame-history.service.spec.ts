import { TestBed } from '@angular/core/testing';

import { PlanesHistoryService } from './plane-frame-history.service';

describe('PlanesHistoryService', () => {
  let service: PlanesHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
