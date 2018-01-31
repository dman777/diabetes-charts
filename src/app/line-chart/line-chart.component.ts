import { Component, Input } from '@angular/core';
import { LineChartService } from '../line-chart.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  template: '<div class="graph-sheet"></div>',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent {
  @Input()
  curveData: Array<object>;
  graphSize: String;

  constructor(
    private lineChartService: LineChartService,
  ) { }

  ngOnInit() {
    this.lineChartService.makeGraph(this.curveData);
  }
}
