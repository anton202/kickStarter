import { TestBed, async, inject } from '@angular/core/testing';

import { IsLogedGuard } from './is-loged.guard';

describe('IsLogedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLogedGuard]
    });
  });

  it('should ...', inject([IsLogedGuard], (guard: IsLogedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
