import { TestBed } from '@angular/core/testing';

import { H24BackendService } from './h24-backend.service';

describe('H24BackendService', () => {
  let service: H24BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(H24BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
