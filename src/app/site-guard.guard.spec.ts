import { TestBed } from '@angular/core/testing';

import { SiteGuardGuard } from './site-guard.guard';

describe('SiteGuardGuard', () => {
  let guard: SiteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SiteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
