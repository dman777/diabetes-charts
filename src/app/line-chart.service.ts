import { Injectable } from '@angular/core';
import { LineChartHelperService } from './line-chart-helper.service';
import * as d3 from 'd3';

@Injectable()
export class LineChartService {
  constructor(private lineChartHelperService: LineChartHelperService) { }

  graph = this.lineChartHelperService.setGraphSize('large');


  margin = {top: 20, right: 30, bottom: 30, left: 30};
  width = this.graph.width - this.margin.left - this.margin.right;
  height = this.graph.height - this.margin.top - this. margin.bottom;

  parseDate = d3.timeParse('%H:%M');

  // converts strings to date times
  //scope.curveData.meta.forEach(function(d) {
  // d.timeStamp = parseDate(d.timeStamp);
  //  d.glucoseLevel = +d.glucoseLevel;
  //});

  x = d3.scaleTime()
    .range([0, width]);

  y = d3.scaleLinear()
    .range([height, 0]);

  timeStampList =
    scope.curveData.meta.map(function (d) { return d.timeStamp; });

  // creates X axis
  xAxis = d3.axisBottom(x)
                .tickValues(timeStampList)
                .tickFormat(d3.timeFormat("%I:%M %p"));

  glucoseLevelList =
    this.lineChartHelperService.getTicks('glucoseLevel', scope.curveData);

  yAxis = d3.axisLeft(y).tickValues(glucoseLevelList)
    .tickPadding(2);

  curve = d3.line()
    .x(function(d) { return x(d.timeStamp); })
    .y(function(d) { return y(d.glucoseLevel); })
    .curve(d3.curveCatmullRom.alpha(0.5));

  divEl = element[0].querySelector('div');
  divEl.classList.add(attrs.graphSize);

  svg = d3.select(divEl).append('svg')
   .attr('width', width + margin.left + margin.right)
   .attr('height', height + margin.top + margin.bottom)
   .append('g')
   .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(d3.extent(scope.curveData.meta,
    function(d) { return d.timeStamp; }));
  y.domain(d3.extent(scope.curveData.meta,
    function(d) { return d.glucoseLevel; }));

  // Add the scatterplot
  svg.selectAll("dot")
    .data(scope.curveData.meta)
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.timeStamp); })
    .attr("cy", function(d) { return y(d.glucoseLevel); });

  // Add the X Axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  // Add the Y Axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  // Add the value curve path.
  svg.append('path')
    .attr('class', 'curve')
    .attr('d', curve(scope.curveData.meta))
    .transition()
      .duration(1500)
      .attrTween("stroke-dasharray", function() {
        len = this.getTotalLength();
        return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
      });

  graphTitle =
    this.lineChartHelperService.graphTitleGenerator(scope.curveData);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 4))
    .attr("text-anchor", "middle")
    .style("font-size", graph.font)
    .style("font-weight", "500")
    .style("font-family",
      "'Roboto Mono',RobotoDraft,Helvetica,Arial,sans-serif")
    .text(graphTitle);
}
}

}
