import { Component, OnInit } from '@angular/core';
import { GetChartDataService } from '../get-chart-data.service';

@Component({
  selector: 'app-today-chart',
  templateUrl: './today-chart.component.html',
  styleUrls: ['./today-chart.component.css']
})

export class TodayChartComponent implements OnInit {

  public charts;

  constructor(private getChartDataService: GetChartDataService) {

  
  }

  ngOnInit() {
    this.charts = this.getChartDataService.getData();
  }

}
