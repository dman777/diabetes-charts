import { Injectable } from '@angular/core';
import { LineChartHelperService } from './line-chart-helper.service';
import * as d3 from 'd3';

@Injectable()
export class LineChartService {
  constructor(private lineChartHelperService: LineChartHelperService) { }

    makeGraph(curveData): any {
      const graph = this.lineChartHelperService.setGraphSize('large');

      const margin = {top: 20, right: 30, bottom: 30, left: 30};
      const width = graph.width - margin.left - margin.right;
      const height = graph.height - margin.top - margin.bottom;

      const parseDate = d3.timeParse('%H:%M');

      // converts strings to date times
      curveData.timestamps.forEach(function(d) {
        d.timeStamp = parseDate(d.timeStamp);
        d.glucoseLevel = +d.glucoseLevel;
      });

      const x = d3.scaleTime()
        .range([0, width]);

      const y = d3.scaleLinear()
        .range([height, 0]);

      const timeStampList =
        curveData.timestamps.map(function (d) { return d.timeStamp; });

      // creates X axis
      const xAxis = d3.axisBottom(x)
                    .tickValues(timeStampList)
                    .tickFormat(d3.timeFormat("%I:%M %p"));

      const glucoseLevelList =
        this.lineChartHelperService.getTicks('glucoseLevel', curveData);

      const yAxis = d3.axisLeft(y).tickValues(glucoseLevelList)
        .tickPadding(2);

      const curve = d3.line()
        .x(function(d) { return x(d.timeStamp); })
        .y(function(d) { return y(d.glucoseLevel); })
        .curve(d3.curveCatmullRom.alpha(0.5));

      //DARIN FIX - FIND REAL ELEMENT
      const divEl = document.querySelector('.graph-sheet');
      divEl.classList.add('large');

      const svg = d3.select(divEl).append('svg')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom)
       .append('g')
       .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

      x.domain(d3.extent(curveData.timestamps,
        function(d) { return d.timeStamp; }));
      y.domain(d3.extent(curveData.timestamps,
        function(d) { return d.glucoseLevel; }));

      // Add the scatterplot
      svg.selectAll("dot")
        .data(curveData.timestamps)
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
        .attr('style', 'fill: none; stroke: steelblue; stroke-width: 1.5px')
        .attr('d', curve(curveData.timestamps))
        .transition()
          .duration(1500)
          .attrTween("stroke-dasharray", function() {
            const len = this.getTotalLength();
            return function(t) { return (d3.interpolateString("0," + len, len + ",0"))(t) };
          });

      const graphTitle =
        this.lineChartHelperService.graphTitleGenerator(curveData);

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
