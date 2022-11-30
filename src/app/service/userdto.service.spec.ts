import { TestBed } from '@angular/core/testing';

import { UserdtoService } from './userdto.service';

describe('UserdtoService', () => {
  let service: UserdtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
