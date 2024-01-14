import { TestBed } from '@angular/core/testing';

import { AccessGaurdGuard } from './access-gaurd.guard';

describe('AccessGaurdGuard', () => {
  let guard: AccessGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
