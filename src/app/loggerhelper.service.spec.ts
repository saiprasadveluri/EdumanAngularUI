import { TestBed } from '@angular/core/testing';

import { LoggerhelperService } from './loggerhelper.service';

describe('LoggerhelperService', () => {
  let service: LoggerhelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
