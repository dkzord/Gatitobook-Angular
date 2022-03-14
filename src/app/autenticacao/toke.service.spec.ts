import { TestBed } from '@angular/core/testing';

import { TokeService } from './toke.service';

describe('TokeService', () => {
  let service: TokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
