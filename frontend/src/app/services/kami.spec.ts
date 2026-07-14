import { TestBed } from '@angular/core/testing';

import { Kami } from './kami';

describe('Kami', () => {
  let service: Kami;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kami);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
