import { TestBed } from '@angular/core/testing';

import { ParentMapService } from './parent-map.service';

describe('ParentMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParentMapService = TestBed.get(ParentMapService);
    expect(service).toBeTruthy();
  });
});
