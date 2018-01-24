import { Component, OnInit } from '@angular/core';
import { GetChartDataService } from '../get-chart-data.service';
import { LineChartService } from '../line-chart.service';

@Component({
  selector: 'app-today-chart',
  templateUrl: './today-chart.component.html',
  styleUrls: ['./today-chart.component.css']
})

export class TodayChartComponent implements OnInit {

  public charts;

  constructor(
    private getChartDataService: GetChartDataService,
    private lineChartService: LineChartService,
  ) {

  
  }

  ngOnInit() {
    this.charts = this.getChartDataService.getData();
  }

}
