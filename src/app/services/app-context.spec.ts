import { TestBed } from '@angular/core/testing';

import { AppContext } from './app-context';

describe('AppContext', () => {
  let service: AppContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
