import { TestBed, inject } from '@angular/core/testing';

import { GetChartDataService } from './get-chart-data.service';

describe('GetChartDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChartDataService]
    });
  });

  it('should be created', inject([GetChartDataService], (service: GetChartDataService) => {
    expect(service).toBeTruthy();
  }));
});
