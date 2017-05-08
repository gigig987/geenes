/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewGenerationService } from './new-generation.service';

describe('NewGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewGenerationService]
    });
  });

  it('should ...', inject([NewGenerationService], (service: NewGenerationService) => {
    expect(service).toBeTruthy();
  }));
});
