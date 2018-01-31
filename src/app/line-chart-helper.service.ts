import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class LineChartHelperService {
  getTicks = (key, data) => {
    var tickList = data.timestamps.map(function(element) {
      var value = element[key];
      return parseInt(value);
    });
    return tickList;
  }

  graphTitleGenerator = (data) => {
    var formats = {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: 'MM/DD/YYYY',
      sameElse: 'MM/DD/YYYY'
    }
    var today = new Date();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var year = today.getFullYear();
    var refDate = (month <= 9 ? '0' + month: month)
                 + '-' + (day <= 9 ? '0' + day: day) + '-' + year;
    var graphTitle = moment(data.date, 'MM-DD-YYYY')
      .calendar(moment(refDate, 'MM-DD-YYYY'), formats);
    return graphTitle;
  }

  setGraphSize = (size) => {
    var graph = {
      width: undefined,
      height: undefined,
      font: undefined,
    };

    if (size === 'large') {
      graph.width = 600;
      graph.height = 300;
      graph.font = '20px';
    }
    else if (size === 'med') {
      graph.width = 500;
      graph.height = 200;
      graph.font = '18px';
    } else {
      graph.width = 300;
      graph.height = 100;
      graph.font = '15px';
    }
    return graph;
  }
}
