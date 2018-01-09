import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class GetChartDataService {
  private chartDataUrl = 'api/curves';

  
  getData (): Observable<any> {
    return this.http.get(this.chartDataUrl);
  }

  constructor(private http: HttpClient) {}

}
